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
    ApiResponse<Record<string, QuestionType>>
  > => {
    return await getQuestions()
  },

  getQuestion: async (id: string): Promise<ApiResponse<QuestionType>> => {
    return await getQuestion(id)
  },

  getQuestionsByQnaId: async (
    qnaId: string,
  ): Promise<ApiResponse<Record<string, QuestionType>>> => {
    return await getQuestionsByQnaId(qnaId)
  },

  addQuestion: async (
    qnaId: string,
    content: string,
    author: string,
  ): Promise<ApiResponse<QuestionType>> => {
    return await addQuestion(qnaId, content, author)
  },

  likeQuestion: async (
    questionId: string,
    userId: string,
  ): Promise<ApiResponse<QuestionType>> => {
    return await likeQuestion(questionId, userId)
  },

  toggleQuestionAnswered: async (
    questionId: string,
  ): Promise<ApiResponse<QuestionType>> => {
    return await toggleQuestionAnswered(questionId)
  },

  // Answer methods
  getAnswers: async (): Promise<ApiResponse<Record<string, AnswerType>>> => {
    return await getAnswers()
  },

  getAnswer: async (id: string): Promise<ApiResponse<AnswerType>> => {
    return await getAnswer(id)
  },

  getAnswersByQuestionId: async (
    questionId: string,
  ): Promise<ApiResponse<Record<string, AnswerType>>> => {
    return await getAnswersByQuestionId(questionId)
  },

  getAnswersByQnaId: async (
    qnaId: string,
  ): Promise<ApiResponse<Record<string, AnswerType>>> => {
    return await getAnswersByQnaId(qnaId)
  },

  addAnswer: async (
    questionId: string,
    qnaId: string,
    content: string,
    author: string,
  ): Promise<ApiResponse<AnswerType>> => {
    return await addAnswer(questionId, qnaId, content, author)
  },

  likeAnswer: async (
    answerId: string,
    userId: string,
  ): Promise<ApiResponse<AnswerType>> => {
    return await likeAnswer(answerId, userId)
  },

  // QnA methods
  getQnAs: async (): Promise<ApiResponse<Record<string, QnAType>>> => {
    return await getQnAs()
  },

  getQnA: async (id: string): Promise<ApiResponse<QnAType>> => {
    return await getQnA(id)
  },

  addQnA: async (
    qnaData: Omit<QnAType, 'id' | 'questionsIds'>,
  ): Promise<ApiResponse<QnAType>> => {
    return await addQnA(qnaData)
  },

  updateQnA: async (
    qnaId: string,
    qnaData: Partial<QnAType>,
  ): Promise<ApiResponse<QnAType>> => {
    return await updateQnA(qnaId, qnaData)
  },

  deleteQnA: async (qnaId: string): Promise<ApiResponse<boolean>> => {
    return await deleteQnAHandler(qnaId)
  },

  // Poll methods
  getPolls: async (): Promise<ApiResponse<Record<string, PollType>>> => {
    return await getPolls()
  },

  getPoll: async (id: string): Promise<ApiResponse<PollType>> => {
    return await getPoll(id)
  },

  getPollsByQnaId: async (
    qnaId: string,
  ): Promise<ApiResponse<Record<string, PollType>>> => {
    return await getPollsByQnaId(qnaId)
  },

  addPoll: async (
    poll: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>,
    pollOptions: { title: string; isCorrectAnswer?: boolean }[] = [],
  ): Promise<ApiResponse<PollType>> => {
    return await addPollHandler(poll, pollOptions)
  },

  updatePoll: async (
    pollId: string,
    pollData: Partial<PollType>,
  ): Promise<ApiResponse<PollType>> => {
    return await updatePoll(pollId, pollData)
  },

  deletePoll: async (pollId: string): Promise<ApiResponse<boolean>> => {
    return await deletePollHandler(pollId)
  },

  // Poll option methods
  getPollOptions: async (): Promise<
    ApiResponse<Record<string, PollOptionType>>
  > => {
    return await getPollOptions()
  },

  getPollOption: async (id: string): Promise<ApiResponse<PollOptionType>> => {
    return await getPollOption(id)
  },

  getPollOptionsByPollId: async (
    pollId: string,
  ): Promise<ApiResponse<Record<string, PollOptionType>>> => {
    return await getPollOptionsByPollId(pollId)
  },

  // Poll voting
  votePoll: async (
    pollId: string,
    optionIds: string[],
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
