import { AnswerType, QuestionType } from '@/types/qna.types'

export enum ApiMessageType {
  CONTROL_MESSAGE = 'control_msg',
  QUESTION_MESSAGE = 'question_msg',
  ANSWER_MESSAGE = 'answer_msg',
  ANSWERED_MESSAGE = 'answered_msg',
  UPVOTE_MESSAGE = 'upvote_msg',
  MODERATION_MESSAGE = 'moderation_msg',
  POLL_CREATE_MESSAGE = 'poll_create_msg',
  POLL_VOTE_MESSAGE = 'poll_vote_msg',
  POLL_ACTIVE_MESSAGE = 'poll_active_msg',
  SNAPSHOT = 'snapshot',
  PERSIST_SNAPSHOT = 'persist_snapshot',
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface SubscriptionCallback<T> {
  (data: T): void
}

export interface ApiConnector {
  likeQuestion: (
    questionId: number,
    userId: string,
  ) => Promise<ApiResponse<QuestionType>>

  toggleQuestionAnswered: (
    questionId: number,
  ) => Promise<ApiResponse<QuestionType>>

  addAnswer: (
    questionId: number,
    qnaId: number,
    content: string,
    author: string,
  ) => Promise<ApiResponse<AnswerType>>

  likeAnswer: (
    answerId: number,
    userId: string,
  ) => Promise<ApiResponse<AnswerType>>

  subscribe: <T>(
    messageType: ApiMessageType,
    callback: SubscriptionCallback<T>,
  ) => () => void
}
