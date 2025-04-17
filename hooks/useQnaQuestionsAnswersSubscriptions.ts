import { apiConnector } from '@/lib/api/connector'
import { AnswerType, QuestionType } from '@/types/qna.types'
import { loadQnaData } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { QakuEvents } from 'qakulib'
import { useEffect, useRef } from 'react'
import { answersRecordAtom } from '../atoms/answer'
import { questionsRecordAtom } from '../atoms/question'

// Hook for managing QnA-specific subscriptions and data loading for questions and answers only
export const useQnaQuestionsAnswersSubscriptions = (qnaId: string) => {
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    console.log(qnaId)
    if (!qnaId || qnaId == 'undefined') return

    const qnaSub = async () => {
      loadQnaData({ qnaId, setQuestionsRecord, setAnswersRecord })

      const questionSub = await apiConnector.subscribe<
        Record<string, QuestionType>
      >(
        QakuEvents.NEW_QUESTION,
        (id, data) => {
          if (qnaId !== id) return
          setQuestionsRecord(data)
        },
        { qnaId },
      )

      const answerSub = await apiConnector.subscribe<AnswerType>(
        QakuEvents.NEW_ANSWER,
        (od, answer) => {
          if (answer.qnaId === qnaId) {
            setAnswersRecord((prev: Record<string, AnswerType>) => ({
              ...prev,
              [answer.id]: answer,
            }))
          }
        },
        { qnaId },
      )

      const upvoteSub = await apiConnector.subscribe<QuestionType | AnswerType>(
        QakuEvents.NEW_UPVOTE,
        (id, data) => {
          if ('questionId' in data) {
            // It's an answer
            if (data.qnaId === qnaId) {
              setAnswersRecord((prev: Record<string, AnswerType>) => ({
                ...prev,
                [data.id]: data as AnswerType,
              }))
            }
          } else {
            // It's a question
            if (data.qnaId === qnaId) {
              setQuestionsRecord((prev: Record<string, QuestionType>) => ({
                ...prev,
                [data.id]: data as QuestionType,
              }))
            }
          }
        },
        { qnaId },
      )

      const answeredSub = await apiConnector.subscribe<QuestionType>(
        QakuEvents.NEW_ANSWER,
        (question) => {
          if (question.qnaId === qnaId) {
            setQuestionsRecord((prev: Record<string, QuestionType>) => ({
              ...prev,
              [question.id]: question,
            }))
          }
        },
        { qnaId },
      )

      return async () => {
        questionSub()
        answerSub()
        upvoteSub()
        answeredSub()
      }
    }

    qnaSub().then((cleanup) => {
      cleanupRef.current = cleanup
    })
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [qnaId, setQuestionsRecord, setAnswersRecord])
}
