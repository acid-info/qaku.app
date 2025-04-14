import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { allQuestionsWithAnswersForQnAAtom } from '../atoms/selectors'

// Hook for accessing questions with their answers for a specific QnA
export const useQnaQuestionsWithAnswers = (qnaId: string) => {
  const questionsWithAnswersAtom = useMemo(
    () => allQuestionsWithAnswersForQnAAtom(qnaId),
    [qnaId],
  )

  const questionsWithAnswers = useAtomValue(questionsWithAnswersAtom)

  const answeredQuestions = useMemo(() => {
    return questionsWithAnswers.filter((question) => question.isAnswered)
  }, [questionsWithAnswers])

  const unansweredQuestions = useMemo(() => {
    return questionsWithAnswers.filter((question) => !question.isAnswered)
  }, [questionsWithAnswers])

  const popularQuestions = useMemo(() => {
    return questionsWithAnswers.filter(
      (question) => question.answers.length >= 2 && !question.isAnswered,
    )
  }, [questionsWithAnswers])

  return {
    questions: questionsWithAnswers,
    answeredQuestions,
    unansweredQuestions,
    popularQuestions,
    questionsCount: questionsWithAnswers.length,
    answeredCount: answeredQuestions.length,
    unansweredCount: unansweredQuestions.length,
    popularCount: popularQuestions.length,
    hasQuestions: questionsWithAnswers.length > 0,
  }
}
