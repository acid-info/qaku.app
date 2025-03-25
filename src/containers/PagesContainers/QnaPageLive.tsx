import { answersRecordAtom } from '@/../atoms/answer'
import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { getQnaByIdAtom } from '@/../atoms/qna'
import { questionsRecordAtom } from '@/../atoms/question'
import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsAnswersSubscriptions } from '@/../hooks/useQnaQuestionsAnswersSubscriptions'
import { QnaFloatingPanel } from '@/components/FloatingPanel'
import MobileBottomPanel from '@/components/MobileBottomPanel/MobileBottomPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { QnaLive } from '@/containers/QnaLive/QnaLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { NOT_FOUND, poll as pollRoutes, qna as qnaRoutes } from '@/data/routes'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { endQnA, loadQnaData, updateQnA } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

export const QnaPageLive: React.FC = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const { userName } = useAtomValue(walletStateAtom)

  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  const qnaAtom = useMemo(() => {
    if (!id) return atom(null)
    return getQnaByIdAtom(id)
  }, [id])

  const qna = useAtomValue(qnaAtom)

  useQnaQuestionsAnswersSubscriptions(id)

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        await loadQnaData({ qnaId: id, setQuestionsRecord, setAnswersRecord })
        setIsDataFetched(true)
        setIsLoading(false)
      } catch (_) {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router.isReady, id, setQuestionsRecord, setAnswersRecord])

  useEffect(() => {
    if (!router.isReady || id == null) return
    if (isDataFetched && !isLoading && !qna) {
      router.push(NOT_FOUND)
    }
  }, [router, id, qna, isLoading, isDataFetched])

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

  const handleEndClick = async () => {
    const response = await endQnA(id)
    if (!response.success) {
      console.error('Failed to end QnA:', response.error)
    } else {
      router.push(qnaRoutes.CREATED.replace(':id', id.toString()))
    }
  }

  const handleAddPollClick = () => {
    router.push(`${pollRoutes.CREATE}?qnaId=${id}`)
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
        date: qna?.startDate.toISOString(),
        count: qna?.questionsIds.length,
        id: id.toString(),
        showSettingsButton: true,
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: handleAddPollClick,
        showShareButton: true,
        onShareClick: handleShareClick,
        onEndClick: handleEndClick,
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
      <MobileBottomPanel>
        <p>Content</p>
      </MobileBottomPanel>
    </DefaultLayoutContainer>
  )
}
