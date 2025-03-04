import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { AnswerType, QuestionType } from '@/types/qna.types'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { answersRecordAtom } from '../../../atoms/answerAtom'
import { questionsRecordAtom } from '../../../atoms/questionAtom'

export const ApiSubscriptionManager = () => {
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  useEffect(() => {
    const questionSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.QUESTION_MESSAGE,
      (question) => {
        setQuestionsRecord((prev: Record<number, QuestionType>) => ({
          ...prev,
          [question.id]: question,
        }))
      },
    )

    const answerSub = apiConnector.subscribe<AnswerType>(
      ApiMessageType.ANSWER_MESSAGE,
      (answer) => {
        setAnswersRecord((prev: Record<number, AnswerType>) => ({
          ...prev,
          [answer.id]: answer,
        }))
      },
    )

    const upvoteSub = apiConnector.subscribe<QuestionType | AnswerType>(
      ApiMessageType.UPVOTE_MESSAGE,
      (data) => {
        // Check if it's a question or answer
        if ('questionId' in data) {
          // It's an answer
          setAnswersRecord((prev: Record<number, AnswerType>) => ({
            ...prev,
            [data.id]: data as AnswerType,
          }))
        } else {
          // It's a question
          setQuestionsRecord((prev: Record<number, QuestionType>) => ({
            ...prev,
            [data.id]: data as QuestionType,
          }))
        }
      },
    )

    const answeredSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.ANSWERED_MESSAGE,
      (question) => {
        setQuestionsRecord((prev: Record<number, QuestionType>) => ({
          ...prev,
          [question.id]: question,
        }))
      },
    )

    return () => {
      questionSub()
      answerSub()
      upvoteSub()
      answeredSub()
    }
  }, [setQuestionsRecord, setAnswersRecord])

  return null
}
