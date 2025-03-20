import { SEO } from '@/components/SEO'
import { QnaCreated } from '@/containers/QnaCreated/QnaCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { loadQnaData } from '@/utils/api.utils'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { answersRecordAtom } from '../../../atoms/answer'
import { getQnaByIdAtom } from '../../../atoms/qna'
import { questionsRecordAtom } from '../../../atoms/question'

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
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const baseUrl = `${url.protocol}//${url.host}`
      const shareUrl = `${baseUrl}/user/qna/${qnaId}`

      navigator.clipboard
        .writeText(shareUrl)
        .then(() => alert('Share link to user QnA view copied to clipboard!'))
        .catch((err) => console.error('Failed to copy link:', err))
    }
  }

  useEffect(() => {
    if (!qnaId) return
    loadQnaData({ qnaId, setQuestionsRecord, setAnswersRecord })
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
        showShareButton: true,
        onShareClick: handleShareClick,
      }}
    >
      <SEO />
      <QnaCreated qnaId={qnaId} />
    </DefaultLayout>
  )
}
