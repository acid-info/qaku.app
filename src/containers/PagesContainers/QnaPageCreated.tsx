import { answersRecordAtom } from '@/../atoms/answer'
import { getQnaByIdAtom } from '@/../atoms/qna'
import { questionsRecordAtom } from '@/../atoms/question'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { QnaCreated } from '@/containers/QnaCreated/QnaCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { loadQnaData } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

export const QnaPageCreated: React.FC = () => {
  const router = useRouter()
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  const qnaId = useMemo(() => {
    const id = router.query.id
    return parseInt(String(id), 10)
  }, [router.query.id])

  const qnaAtom = useMemo(() => {
    if (!qnaId) return atom(null)
    return getQnaByIdAtom(qnaId)
  }, [qnaId])

  const qna = useAtomValue(qnaAtom)

  const handleShareClick = () => {
    handleShare({
      qnaId,
      mode: NavbarModeEnum.Qna,
    })
  }

  useEffect(() => {
    if (!qnaId) return
    loadQnaData({ qnaId, setQuestionsRecord, setAnswersRecord })
  }, [qnaId, setQuestionsRecord, setAnswersRecord])

  if (!router.isReady || !qnaId || !qna) {
    return null
  }

  return (
    <DefaultLayoutContainer
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.Ended,
        title: qna.title,
        date: qna.startDate.toISOString(),
        count: qna.questionsIds.length,
        id: qnaId.toString(),
        showShareButton: true,
        onShareClick: handleShareClick,
      }}
    >
      <SEO />
      <QnaCreated qnaId={qnaId} />
    </DefaultLayoutContainer>
  )
}
