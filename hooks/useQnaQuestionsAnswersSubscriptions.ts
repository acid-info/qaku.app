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
    if (!qnaId || qnaId == 'undefined') return

    const qnaSub = async () => {
      loadQnaData({ qnaId, setQuestionsRecord, setAnswersRecord })

      const questionSub = await apiConnector.subscribe<QuestionType>(
        QakuEvents.NEW_QUESTION,
        (id, data) => {
          if (id === qnaId) {
            console.log(data)
            setQuestionsRecord((prev: Record<string, QuestionType>) => ({
              ...prev,
              [data.id]: data,
            }))
          }
        },
        { qnaId },
      )

      const answerSub = await apiConnector.subscribe<AnswerType>(
        QakuEvents.NEW_ANSWER,
        (id, data) => {
          if (id === qnaId) {
            if (qnaId !== id) return
            setAnswersRecord((prev: Record<string, AnswerType>) => ({
              ...prev,
              [data.id]: data,
            }))
          }
        },
        { qnaId },
      )

      const upvoteSub = await apiConnector.subscribe<QuestionType>(
        QakuEvents.NEW_UPVOTE,
        (id, data) => {
          if (id === qnaId) {
            if (qnaId !== id) return
            // It's an answer
            if ('questionId' in data) {
              setAnswersRecord((prev: Record<string, AnswerType>) => ({
                ...prev,
                [data.id]: data as AnswerType,
              }))
            } else {
              setQuestionsRecord((prev: Record<string, QuestionType>) => ({
                ...prev,
                [data.id]: data as QuestionType,
              }))
            }
          }
        },
        { qnaId },
      )

      return async () => {
        questionSub()
        answerSub()
        upvoteSub()
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
