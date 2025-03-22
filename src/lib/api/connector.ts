import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'
import {
  addAnswer,
  addPoll as addPollHandler,
  addQnA,
  addQuestion,
  deletePoll as deletePollHandler,
  deleteQnA as deleteQnAHandler,
  subscribe as fakeSubscribe,
  getAnswer,
  getAnswers,
  getAnswersByQnaId,
  getAnswersByQuestionId,
  getPoll,
  getPollOption,
  getPollOptions,
  getPollOptionsByPollId,
  getPolls,
  getPollsByQnaId,
  getQnA,
  getQnAs,
  getQuestion,
  getQuestions,
  getQuestionsByQnaId,
  likeAnswer,
  likeQuestion,
  toggleQuestionAnswered,
  updatePoll,
  updateQnA,
  votePoll,
} from './fake/handlers'
import {
  ApiConnector,
  ApiMessageType,
  ApiResponse,
  SubscriptionCallback,
  SubscriptionFilter,
} from './types'

export const apiConnector: ApiConnector = {
  // Question methods
  getQuestions: async (): Promise<
    ApiResponse<Record<number, QuestionType>>
  > => {
    return await getQuestions()
  },

  getQuestion: async (id: number): Promise<ApiResponse<QuestionType>> => {
    return await getQuestion(id)
  },

  getQuestionsByQnaId: async (
    qnaId: number,
  ): Promise<ApiResponse<Record<number, QuestionType>>> => {
    return await getQuestionsByQnaId(qnaId)
  },

  addQuestion: async (
    qnaId: number,
    content: string,
    author: string,
  ): Promise<ApiResponse<QuestionType>> => {
    return await addQuestion(qnaId, content, author)
  },

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

  // Answer methods
  getAnswers: async (): Promise<ApiResponse<Record<number, AnswerType>>> => {
    return await getAnswers()
  },

  getAnswer: async (id: number): Promise<ApiResponse<AnswerType>> => {
    return await getAnswer(id)
  },

  getAnswersByQuestionId: async (
    questionId: number,
  ): Promise<ApiResponse<Record<number, AnswerType>>> => {
    return await getAnswersByQuestionId(questionId)
  },

  getAnswersByQnaId: async (
    qnaId: number,
  ): Promise<ApiResponse<Record<number, AnswerType>>> => {
    return await getAnswersByQnaId(qnaId)
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

  // QnA methods
  getQnAs: async (): Promise<ApiResponse<Record<number, QnAType>>> => {
    return await getQnAs()
  },

  getQnA: async (id: number): Promise<ApiResponse<QnAType>> => {
    return await getQnA(id)
  },

  addQnA: async (
    qnaData: Omit<QnAType, 'id' | 'questionsIds'>,
  ): Promise<ApiResponse<QnAType>> => {
    return await addQnA(qnaData)
  },

  updateQnA: async (
    qnaId: number,
    qnaData: Partial<QnAType>,
  ): Promise<ApiResponse<QnAType>> => {
    return await updateQnA(qnaId, qnaData)
  },

  deleteQnA: async (qnaId: number): Promise<ApiResponse<boolean>> => {
    return await deleteQnAHandler(qnaId)
  },

  // Poll methods
  getPolls: async (): Promise<ApiResponse<Record<number, PollType>>> => {
    return await getPolls()
  },

  getPoll: async (id: number): Promise<ApiResponse<PollType>> => {
    return await getPoll(id)
  },

  getPollsByQnaId: async (
    qnaId: number,
  ): Promise<ApiResponse<Record<number, PollType>>> => {
    return await getPollsByQnaId(qnaId)
  },

  addPoll: async (
    poll: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>,
    pollOptions: { title: string; isCorrectAnswer?: boolean }[] = [],
  ): Promise<ApiResponse<PollType>> => {
    return await addPollHandler(poll, pollOptions)
  },

  updatePoll: async (
    pollId: number,
    pollData: Partial<PollType>,
  ): Promise<ApiResponse<PollType>> => {
    return await updatePoll(pollId, pollData)
  },

  deletePoll: async (pollId: number): Promise<ApiResponse<boolean>> => {
    return await deletePollHandler(pollId)
  },

  // Poll option methods
  getPollOptions: async (): Promise<
    ApiResponse<Record<number, PollOptionType>>
  > => {
    return await getPollOptions()
  },

  getPollOption: async (id: number): Promise<ApiResponse<PollOptionType>> => {
    return await getPollOption(id)
  },

  getPollOptionsByPollId: async (
    pollId: number,
  ): Promise<ApiResponse<Record<number, PollOptionType>>> => {
    return await getPollOptionsByPollId(pollId)
  },

  // Poll voting
  votePoll: async (
    pollId: number,
    optionIds: number[],
    voter: string,
  ): Promise<ApiResponse<PollOptionType[]>> => {
    return await votePoll(pollId, optionIds, voter)
  },

  // Enhanced subscribe method with filter support
  subscribe: <T>(
    messageType: ApiMessageType,
    callback: SubscriptionCallback<T>,
    filter?: SubscriptionFilter,
  ): (() => void) => {
    return fakeSubscribe(messageType, callback, filter)
  },
}
