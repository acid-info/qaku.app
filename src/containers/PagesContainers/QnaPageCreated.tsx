import { answersRecordAtom } from '@/../atoms/answer'
import { getQnaByIdAtom } from '@/../atoms/qna'
import { questionsRecordAtom } from '@/../atoms/question'
import { DefaultNavMobileBottomPanel } from '@/components/MobileBottomPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { QnaCreated } from '@/containers/QnaCreated/QnaCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { HOME, NOT_FOUND, QnA as qnaRoutes } from '@/data/routes'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { deleteQnA, loadQnaData, openQnA } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { getQnaProgressStatus } from '@/utils/qna.utils'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

export const QnaPageCreated: React.FC = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  const qnaAtom = useMemo(() => {
    if (!id) return atom(null)
    return getQnaByIdAtom(id)
  }, [id])

  const qna = useAtomValue(qnaAtom)

  const handleShareClick = () => {
    handleShare({
      qnaId: id,
      mode: NavbarModeEnum.Qna,
    })
  }

  const handleDeleteClick = async () => {
    try {
      await deleteQnA(id)
      router.push(HOME)
    } catch (error) {
      console.error('Failed to delete QnA:', error)
    }
  }

  const handleOpenClick = async () => {
    try {
      const response = await openQnA(id)
      if (!response.success) {
        console.error('Failed to open QnA:', response.error)
      } else {
        router.push(qnaRoutes.LIVE.replace(':id', id.toString()))
      }
    } catch (error) {
      console.error('Failed to open QnA:', error)
    }
  }

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

  return (
    <DefaultLayoutContainer
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: false,
        status:
          (qna && getQnaProgressStatus(qna)) || QnaProgressStatusEnum.Ended,
        title: qna?.title,
        startDate: qna?.startDate,
        endDate: qna?.endDate,
        count: qna?.questionsIds.length,
        id: id.toString(),
        showShareButton: true,
        onShareClick: handleShareClick,
        onDeleteClick: handleDeleteClick,
        onStartClick: handleOpenClick,
      }}
    >
      <SEO />
      <QnaCreated qnaId={id} />
      <DefaultNavMobileBottomPanel
        title={qna?.title ?? ''}
        mode={NavbarModeEnum.Qna}
        status={
          (qna && getQnaProgressStatus(qna)) || QnaProgressStatusEnum.Ended
        }
        count={qna?.questionsIds.length ?? 0}
        id={id.toString()}
        startDate={qna?.startDate ?? new Date()}
        endDate={qna?.endDate}
        showShareButton={true}
        onShareClick={handleShareClick}
        onDeleteClick={handleDeleteClick}
        onStartClick={handleOpenClick}
      />
    </DefaultLayoutContainer>
  )
}
