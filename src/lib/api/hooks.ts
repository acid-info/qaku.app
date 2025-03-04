import { useCallback } from 'react'
import { apiConnector } from './connector'
import { ApiMessageType, SubscriptionCallback } from './types'

export const useQuestionInteractions = () => {
  const likeQuestion = useCallback(
    async (questionId: number, userId: string) => {
      return await apiConnector.likeQuestion(questionId, userId)
    },
    [],
  )

  const toggleQuestionAnswered = useCallback(async (questionId: number) => {
    return await apiConnector.toggleQuestionAnswered(questionId)
  }, [])

  return { likeQuestion, toggleQuestionAnswered }
}

export const useAnswerInteractions = () => {
  const likeAnswer = useCallback(async (answerId: number, userId: string) => {
    return await apiConnector.likeAnswer(answerId, userId)
  }, [])

  const addAnswer = useCallback(
    async (
      questionId: number,
      qnaId: number,
      content: string,
      author: string,
    ) => {
      return await apiConnector.addAnswer(questionId, qnaId, content, author)
    },
    [],
  )

  return { likeAnswer, addAnswer }
}

export const useApiSubscription = <T>(
  messageType: ApiMessageType,
  callback: SubscriptionCallback<T>,
) => {
  const subscribe = useCallback(() => {
    return apiConnector.subscribe(messageType, callback)
  }, [messageType, callback])

  return { subscribe }
}
