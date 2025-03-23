import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { getQnaByIdAtom } from '@/../atoms/qna'
import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsAnswersSubscriptions } from '@/../hooks/useQnaQuestionsAnswersSubscriptions'
import { QnaFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { QnaLive } from '@/containers/QnaLive/QnaLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { NOT_FOUND, poll } from '@/data/routes'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { updateQnA } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { checkValidQnA } from '@/utils/qna.utils'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

export const QnaPageLive: React.FC = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const { userName } = useAtomValue(walletStateAtom)

  const qnaAtom = useMemo(() => {
    if (!id) return atom(null)
    return getQnaByIdAtom(id)
  }, [id])

  const qna = useAtomValue(qnaAtom)

  useQnaQuestionsAnswersSubscriptions(id)

  useEffect(() => {
    if (router.isReady && id != null) {
      if (qna == null) {
        const isValidId = checkValidQnA(id)

        if (!isValidId) {
          router.push(NOT_FOUND)
        }
      }
    }
  }, [id, qna, router])

  const handleSaveQna = async (updatedQna: Partial<typeof qna>) => {
    if (!updatedQna) return
    await updateQnA(id, updatedQna)
    setIsSettingsPanelOpen(false)
  }

  const handleShareClick = () => {
    handleShare({
      qnaId: id,
      mode: NavbarModeEnum.Qna,
    })
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
        title: qna?.title,
        date: qna?.startDate?.toISOString(),
        count: qna?.questionsIds?.length,
        id: id.toString(),
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: () => router.push(`${poll.CREATE}?qnaId=${id}`),
        showShareButton: true,
        onShareClick: handleShareClick,
      }}
    >
      <SEO />
      <QnaLive qnaId={id} userId={userName ?? ''} />
      {qna && (
        <QnaFloatingPanel
          isOpen={isSettingsPanelOpen}
          onClose={() => setIsSettingsPanelOpen(false)}
          qna={qna}
          onSave={handleSaveQna}
        />
      )}
    </DefaultLayoutContainer>
  )
}
