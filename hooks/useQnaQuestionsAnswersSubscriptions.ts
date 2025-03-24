import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { AnswerType, QuestionType } from '@/types/qna.types'
import { loadQnaData } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { answersRecordAtom } from '../atoms/answer'
import { questionsRecordAtom } from '../atoms/question'

// Hook for managing QnA-specific subscriptions and data loading for questions and answers only
export const useQnaQuestionsAnswersSubscriptions = (qnaId: number) => {
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  useEffect(() => {
    if (!qnaId) return

    loadQnaData({ qnaId, setQuestionsRecord, setAnswersRecord })

    const questionSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.QUESTION_MESSAGE,
      (question) => {
        if (question.qnaId === qnaId) {
          setQuestionsRecord((prev: Record<number, QuestionType>) => ({
            ...prev,
            [question.id]: question,
          }))
        }
      },
      { qnaId },
    )

    const answerSub = apiConnector.subscribe<AnswerType>(
      ApiMessageType.ANSWER_MESSAGE,
      (answer) => {
        if (answer.qnaId === qnaId) {
          setAnswersRecord((prev: Record<number, AnswerType>) => ({
            ...prev,
            [answer.id]: answer,
          }))
        }
      },
      { qnaId },
    )

    const upvoteSub = apiConnector.subscribe<QuestionType | AnswerType>(
      ApiMessageType.UPVOTE_MESSAGE,
      (data) => {
        if ('questionId' in data) {
          // It's an answer
          if (data.qnaId === qnaId) {
            setAnswersRecord((prev: Record<number, AnswerType>) => ({
              ...prev,
              [data.id]: data as AnswerType,
            }))
          }
        } else {
          // It's a question
          if (data.qnaId === qnaId) {
            setQuestionsRecord((prev: Record<number, QuestionType>) => ({
              ...prev,
              [data.id]: data as QuestionType,
            }))
          }
        }
      },
      { qnaId },
    )

    const answeredSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.ANSWERED_MESSAGE,
      (question) => {
        if (question.qnaId === qnaId) {
          setQuestionsRecord((prev: Record<number, QuestionType>) => ({
            ...prev,
            [question.id]: question,
          }))
        }
      },
      { qnaId },
    )

    return () => {
      questionSub()
      answerSub()
      upvoteSub()
      answeredSub()
    }
  }, [qnaId, setQuestionsRecord, setAnswersRecord])
}
