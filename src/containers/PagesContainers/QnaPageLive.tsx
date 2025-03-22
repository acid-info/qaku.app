import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { getQnaByIdAtom } from '@/../atoms/qna'
import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsAnswersSubscriptions } from '@/../hooks/useQnaQuestionsAnswersSubscriptions'
import { QnaFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { QnaLive } from '@/containers/QnaLive/QnaLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { poll } from '@/data/routes'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { endQnA, updateQnA } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const QnaPageLive: React.FC = () => {
  const router = useRouter()
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const { userName } = useAtomValue(walletStateAtom)

  const qnaId = useMemo(() => {
    const id = router.query.id
    return parseInt(String(id), 10)
  }, [router.query.id])

  const qnaAtom = useMemo(() => {
    if (!qnaId) return atom(null)
    return getQnaByIdAtom(qnaId)
  }, [qnaId])

  const qna = useAtomValue(qnaAtom)

  useQnaQuestionsAnswersSubscriptions(qnaId)

  if (!qnaId || !qna) {
    return null
  }

  const handleSaveQna = async (updatedQna: Partial<typeof qna>) => {
    await updateQnA(qnaId, updatedQna)
    setIsSettingsPanelOpen(false)
  }

  const handleShareClick = () => {
    handleShare({
      qnaId,
      mode: NavbarModeEnum.Qna,
    })
  }

  const handleEndClick = async () => {
    const response = await endQnA(qnaId)
    if (!response.success) {
      console.error('Failed to end QnA:', response.error)
    } else {
      router.push(`/qna/created/${qnaId}`)
    }
  }

  return (
    <DefaultLayoutContainer
      showFooter={false}
      useAlternativeGap
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.InProgress,
        title: qna.title,
        date: qna.startDate.toISOString(),
        count: qna.questionsIds.length,
        id: qnaId.toString(),
        showSettingsButton: true,
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: () => router.push(`${poll.CREATE}?qnaId=${qnaId}`),
        showShareButton: true,
        onShareClick: handleShareClick,
        onEndClick: handleEndClick,
      }}
    >
      <SEO />
      <QnaLive qnaId={qnaId} userId={userName ?? ''} />
      <QnaFloatingPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        qna={qna}
        onSave={handleSaveQna}
      />
    </DefaultLayoutContainer>
  )
}
