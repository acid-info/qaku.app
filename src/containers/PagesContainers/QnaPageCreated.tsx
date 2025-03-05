import { SEO } from '@/components/SEO'
import { QnaCreated } from '@/containers/QnaCreated/QnaCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { loadQnaData } from '@/utils/api.utils'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { answersRecordAtom } from '../../../atoms/answerAtom'
import { getQnaByIdAtom } from '../../../atoms/qnaAtom'
import { questionsRecordAtom } from '../../../atoms/questionAtom'

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

  useEffect(() => {
    if (!qnaId) return
    loadQnaData(qnaId, setQuestionsRecord, setAnswersRecord)
  }, [qnaId, setQuestionsRecord, setAnswersRecord])

  if (!router.isReady || !qnaId || !qna) {
    return null
  }

  return (
    <DefaultLayout
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
      }}
    >
      <SEO />
      <QnaCreated qnaId={qnaId} />
    </DefaultLayout>
  )
}
