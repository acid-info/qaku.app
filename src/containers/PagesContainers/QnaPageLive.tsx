import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { getQnaByIdAtom, qnasRecordAtom } from '@/../atoms/qna'
import { userAtom } from '@/../atoms/user'
import { useQnaQuestionsAnswersSubscriptions } from '@/../hooks/useQnaQuestionsAnswersSubscriptions'
import { QnaFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { updateQnA } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { QnaLive } from '../QnaLive/QnaLive'

export const QnaPageLive: React.FC = () => {
  const router = useRouter()
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const user = useAtomValue(userAtom)
  const setQnasRecord = useSetAtom(qnasRecordAtom)

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

  return (
    <DefaultLayout
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
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: () => router.push(`/poll/create?qnaId=${qnaId}`),
        showShareButton: true,
        onShareClick: handleShareClick,
      }}
    >
      <SEO />
      <QnaLive qnaId={qnaId} userId={user.id} />
      <QnaFloatingPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        qna={qna}
        onSave={handleSaveQna}
      />
    </DefaultLayout>
  )
}
