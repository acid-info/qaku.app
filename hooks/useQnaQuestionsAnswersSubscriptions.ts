import { apiConnector } from '@/lib/api/connector'
import { QuestionType } from '@/types/qna.types'
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

      const answerSub = await apiConnector.subscribe<
        Record<string, QuestionType>
      >(
        QakuEvents.NEW_ANSWER,
        (id, data) => {
          if (id === qnaId) {
            if (qnaId !== id) return
            setQuestionsRecord(data)
          }
        },
        { qnaId },
      )

      const upvoteSub = await apiConnector.subscribe<
        Record<string, QuestionType>
      >(
        QakuEvents.NEW_UPVOTE,
        (id, data) => {
          if (id === qnaId) {
            if (qnaId !== id) return
            setQuestionsRecord(data)
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
