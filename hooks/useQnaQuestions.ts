import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { questionsRecordAtom } from '../atoms/questionAtom'

// Hook for accessing questions data for a specific QnA
export const useQnaQuestions = (qnaId: number) => {
  const questionsRecord = useAtomValue(questionsRecordAtom)

  const qnaQuestions = useMemo(() => {
    return Object.values(questionsRecord).filter(
      (question) => question.qnaId === qnaId,
    )
  }, [questionsRecord, qnaId])

  const answeredQuestions = useMemo(() => {
    return qnaQuestions.filter((question) => question.isAnswered)
  }, [qnaQuestions])

  const unansweredQuestions = useMemo(() => {
    return qnaQuestions.filter((question) => !question.isAnswered)
  }, [qnaQuestions])

  return {
    questions: qnaQuestions,
    answeredQuestions,
    unansweredQuestions,
    questionsCount: qnaQuestions.length,
    answeredCount: answeredQuestions.length,
    unansweredCount: unansweredQuestions.length,
    hasQuestions: qnaQuestions.length > 0,
  }
}
