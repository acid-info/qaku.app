import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { allQuestionsWithAnswersForQnAAtom } from '../atoms/selectors/selectors'

// Hook for accessing questions with their answers for a specific QnA
export const useQnaQuestionsWithAnswers = (qnaId: number) => {
  const questionsWithAnswers = useAtomValue(
    allQuestionsWithAnswersForQnAAtom(qnaId),
  )

  const answeredQuestions = useMemo(() => {
    return questionsWithAnswers.filter((question) => question.isAnswered)
  }, [questionsWithAnswers])

  const unansweredQuestions = useMemo(() => {
    return questionsWithAnswers.filter((question) => !question.isAnswered)
  }, [questionsWithAnswers])

  return {
    questions: questionsWithAnswers,
    answeredQuestions,
    unansweredQuestions,
    questionsCount: questionsWithAnswers.length,
    answeredCount: answeredQuestions.length,
    unansweredCount: unansweredQuestions.length,
    hasQuestions: questionsWithAnswers.length > 0,
  }
}
