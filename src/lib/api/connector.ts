import { AnswerType, QuestionType } from '@/types/qna.types'
import {
  addAnswer,
  subscribe as fakeSubscribe,
  likeAnswer,
  likeQuestion,
  toggleQuestionAnswered,
} from './fake/handlers'
import {
  ApiConnector,
  ApiMessageType,
  ApiResponse,
  SubscriptionCallback,
} from './types'

export const apiConnector: ApiConnector = {
  likeQuestion: async (
    questionId: number,
    userId: string,
  ): Promise<ApiResponse<QuestionType>> => {
    return await likeQuestion(questionId, userId)
  },

  toggleQuestionAnswered: async (
    questionId: number,
  ): Promise<ApiResponse<QuestionType>> => {
    return await toggleQuestionAnswered(questionId)
  },

  addAnswer: async (
    questionId: number,
    qnaId: number,
    content: string,
    author: string,
  ): Promise<ApiResponse<AnswerType>> => {
    return await addAnswer(questionId, qnaId, content, author)
  },

  likeAnswer: async (
    answerId: number,
    userId: string,
  ): Promise<ApiResponse<AnswerType>> => {
    return await likeAnswer(answerId, userId)
  },

  subscribe: <T>(
    messageType: ApiMessageType,
    callback: SubscriptionCallback<T>,
  ): (() => void) => {
    return fakeSubscribe(messageType, callback)
  },
}
