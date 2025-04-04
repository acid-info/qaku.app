import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'

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
  (data: T): void
}

export interface SubscriptionFilter {
  qnaId?: number
  pollId?: number
  questionId?: number
}

export interface ApiConnector {
  // Question methods
  getQuestions: () => Promise<ApiResponse<Record<number, QuestionType>>>
  getQuestion: (id: number) => Promise<ApiResponse<QuestionType>>
  getQuestionsByQnaId: (
    qnaId: number,
  ) => Promise<ApiResponse<Record<number, QuestionType>>>
  addQuestion: (
    qnaId: number,
    content: string,
    author: string,
  ) => Promise<ApiResponse<QuestionType>>
  likeQuestion: (
    questionId: number,
    userId: string,
  ) => Promise<ApiResponse<QuestionType>>
  toggleQuestionAnswered: (
    questionId: number,
  ) => Promise<ApiResponse<QuestionType>>

  // Answer methods
  getAnswers: () => Promise<ApiResponse<Record<number, AnswerType>>>
  getAnswer: (id: number) => Promise<ApiResponse<AnswerType>>
  getAnswersByQuestionId: (
    questionId: number,
  ) => Promise<ApiResponse<Record<number, AnswerType>>>
  getAnswersByQnaId: (
    qnaId: number,
  ) => Promise<ApiResponse<Record<number, AnswerType>>>
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

  // QnA methods
  getQnAs: () => Promise<ApiResponse<Record<number, QnAType>>>
  getQnA: (id: number) => Promise<ApiResponse<QnAType>>
  addQnA: (
    qnaData: Omit<QnAType, 'id' | 'questionsIds'>,
  ) => Promise<ApiResponse<QnAType>>
  updateQnA: (
    qnaId: number,
    qnaData: Partial<QnAType>,
  ) => Promise<ApiResponse<QnAType>>
  deleteQnA: (qnaId: number) => Promise<ApiResponse<boolean>>

  // Poll methods
  getPolls: () => Promise<ApiResponse<Record<number, PollType>>>
  getPoll: (id: number) => Promise<ApiResponse<PollType>>
  getPollsByQnaId: (
    qnaId: number,
  ) => Promise<ApiResponse<Record<number, PollType>>>
  addPoll: (
    poll: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>,
    pollOptions: { title: string; isCorrectAnswer?: boolean }[],
  ) => Promise<ApiResponse<PollType>>
  updatePoll: (
    pollId: number,
    pollData: Partial<PollType>,
  ) => Promise<ApiResponse<PollType>>
  deletePoll: (pollId: number) => Promise<ApiResponse<boolean>>

  // Poll option methods
  getPollOptions: () => Promise<ApiResponse<Record<number, PollOptionType>>>
  getPollOption: (id: number) => Promise<ApiResponse<PollOptionType>>
  getPollOptionsByPollId: (
    pollId: number,
  ) => Promise<ApiResponse<Record<number, PollOptionType>>>
  votePoll: (
    pollId: number,
    optionIds: number[],
    voter: string,
  ) => Promise<ApiResponse<PollOptionType[]>>

  // Subscription methods
  subscribe: <T>(
    messageType: ApiMessageType,
    callback: SubscriptionCallback<T>,
    filter?: SubscriptionFilter,
  ) => () => void
}
