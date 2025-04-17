import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'
import { QakuEvents } from 'qakulib'

export enum ApiMessageType {
  QUESTION_MESSAGE = 'question_msg',
  ANSWER_MESSAGE = 'answer_msg',
  ANSWERED_MESSAGE = 'answered_msg',
  UPVOTE_MESSAGE = 'upvote_msg',
  POLL_CREATE_MESSAGE = 'poll_create_msg',
  POLL_VOTE_MESSAGE = 'poll_vote_msg',
  POLL_ACTIVE_MESSAGE = 'poll_active_msg',
  POLL_UPDATE_MESSAGE = 'poll_update_msg',
  POLL_DELETE_MESSAGE = 'poll_delete_msg',
  QNA_UPDATE_MESSAGE = 'qna_update_msg',
  QNA_DELETE_MESSAGE = 'qna_delete_msg',
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface SubscriptionCallback<T> {
  (id: string, data: T): void
}

export interface SubscriptionFilter {
  qnaId?: string
  pollId?: string
  questionId?: string
}

export interface ApiConnector {
  // Question methods
  getQuestions: () => Promise<ApiResponse<Record<string, QuestionType>>>
  getQuestion: (id: string) => Promise<ApiResponse<QuestionType>>
  getQuestionsByQnaId: (
    qnaId: string,
  ) => Promise<ApiResponse<Record<string, QuestionType>>>
  addQuestion: (
    qnaId: string,
    content: string,
    author: string,
  ) => Promise<ApiResponse<QuestionType>>
  likeQuestion: (
    questionId: string,
    userId: string,
  ) => Promise<ApiResponse<QuestionType>>
  toggleQuestionAnswered: (
    questionId: string,
  ) => Promise<ApiResponse<QuestionType>>

  // Answer methods
  getAnswers: () => Promise<ApiResponse<Record<string, AnswerType>>>
  getAnswer: (id: string) => Promise<ApiResponse<AnswerType>>
  getAnswersByQuestionId: (
    questionId: string,
  ) => Promise<ApiResponse<Record<string, AnswerType>>>
  getAnswersByQnaId: (
    qnaId: string,
  ) => Promise<ApiResponse<Record<string, AnswerType>>>
  addAnswer: (
    questionId: string,
    qnaId: string,
    content: string,
    author: string,
  ) => Promise<ApiResponse<AnswerType>>
  likeAnswer: (
    answerId: string,
    userId: string,
  ) => Promise<ApiResponse<AnswerType>>

  // QnA methods
  getQnAs: () => Promise<ApiResponse<Record<string, QnAType>>>
  getQnA: (id: string) => Promise<ApiResponse<QnAType>>
  addQnA: (
    qnaData: Omit<QnAType, 'id' | 'questionsIds'>,
  ) => Promise<ApiResponse<QnAType>>
  updateQnA: (
    qnaId: string,
    qnaData: Partial<QnAType>,
  ) => Promise<ApiResponse<QnAType>>
  deleteQnA: (qnaId: string) => Promise<ApiResponse<boolean>>

  // Poll methods
  getPolls: () => Promise<ApiResponse<Record<string, PollType>>>
  getPoll: (id: string) => Promise<ApiResponse<PollType>>
  getPollsByQnaId: (
    qnaId: string,
  ) => Promise<ApiResponse<Record<string, PollType>>>
  addPoll: (
    poll: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>,
    pollOptions: { title: string; isCorrectAnswer?: boolean }[],
  ) => Promise<ApiResponse<PollType>>
  updatePoll: (
    pollId: string,
    pollData: Partial<PollType>,
  ) => Promise<ApiResponse<PollType>>
  deletePoll: (pollId: string) => Promise<ApiResponse<boolean>>

  // Poll option methods
  getPollOptions: () => Promise<ApiResponse<Record<string, PollOptionType>>>
  getPollOption: (id: string) => Promise<ApiResponse<PollOptionType>>
  getPollOptionsByPollId: (
    pollId: string,
  ) => Promise<ApiResponse<Record<string, PollOptionType>>>
  votePoll: (
    pollId: string,
    optionIds: string[],
    voter: string,
  ) => Promise<ApiResponse<PollOptionType[]>>

  // Subscription methods
  subscribe: <T>(
    messageType: QakuEvents,
    callback: SubscriptionCallback<T>,
    filter?: SubscriptionFilter,
  ) => Promise<() => void>
}
