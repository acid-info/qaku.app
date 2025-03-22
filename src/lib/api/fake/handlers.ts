import { mockAnswers } from '@/data/mockAnswers'
import { mockPollOptions } from '@/data/mockPollOptions'
import { mockPolls } from '@/data/mockPolls'
import { mockQnAs } from '@/data/mockQnas'
import { mockQuestions } from '@/data/mockQuestions'
import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'
import {
  ApiMessageType,
  ApiResponse,
  SubscriptionCallback,
  SubscriptionFilter,
} from '../types'

// In-memory data store
const dataStore = {
  questions: {} as Record<number, QuestionType>,
  answers: {} as Record<number, AnswerType>,
  qnas: {} as Record<number, QnAType>,
  polls: {} as Record<number, PollType>,
  pollOptions: {} as Record<number, PollOptionType>,
}

// Initialize the store with mock data
const initializeStore = () => {
  mockQuestions.forEach((question) => {
    dataStore.questions[question.id] = question
  })

  mockAnswers.forEach((answer) => {
    dataStore.answers[answer.id] = answer
  })

  mockQnAs.forEach((qna) => {
    dataStore.qnas[qna.id] = qna
  })

  mockPolls.forEach((poll) => {
    dataStore.polls[poll.id] = poll
  })

  mockPollOptions.forEach((option) => {
    dataStore.pollOptions[option.id] = option
  })
}

// Call initialization
initializeStore()

// Enhanced subscriber type with filter
type Subscriber = {
  messageType: ApiMessageType
  callback: (data: any) => void
  id: string
  filter?: SubscriptionFilter
}

const subscribers: Subscriber[] = []

// Enhanced notification function that respects filters
const notifySubscribers = (messageType: ApiMessageType, data: any) => {
  subscribers
    .filter((sub) => {
      // Check if the subscriber is interested in this message type
      if (sub.messageType !== messageType) return false

      // If no filter, notify all subscribers of this message type
      if (!sub.filter) return true

      // Apply filters based on data type
      if (sub.filter.qnaId !== undefined) {
        // For QnA-specific messages
        if ('qnaId' in data && data.qnaId !== sub.filter.qnaId) return false
      }

      if (sub.filter.pollId !== undefined) {
        // For poll-specific messages
        if ('pollId' in data && data.pollId !== sub.filter.pollId) return false
        // Also check for poll options
        if (
          'id' in data &&
          'voters' in data &&
          dataStore.pollOptions[data.id]?.pollId !== sub.filter.pollId
        )
          return false
      }

      if (sub.filter.questionId !== undefined) {
        // For question-specific messages
        if ('questionId' in data && data.questionId !== sub.filter.questionId)
          return false
        // For the question itself
        if (
          'id' in data &&
          'isAnswered' in data &&
          data.id !== sub.filter.questionId
        )
          return false
      }

      return true
    })
    .forEach((sub) => sub.callback(data))
}

// Question-related functions
export const getQuestions = async (): Promise<
  ApiResponse<Record<number, QuestionType>>
> => {
  try {
    return { success: true, data: dataStore.questions }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getQuestion = async (
  id: number,
): Promise<ApiResponse<QuestionType>> => {
  try {
    if (id === undefined || id === null) {
      return { success: false, error: 'Question ID is required' }
    }

    const question = dataStore.questions[id]
    if (!question) {
      return { success: false, error: `Question with ID ${id} not found` }
    }

    return { success: true, data: question }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getQuestionsByQnaId = async (
  qnaId: number,
): Promise<ApiResponse<Record<number, QuestionType>>> => {
  try {
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    // Check if QnA exists
    if (!dataStore.qnas[qnaId]) {
      return { success: false, error: `QnA with ID ${qnaId} not found` }
    }

    const filteredQuestions = Object.values(dataStore.questions)
      .filter((question) => question.qnaId === qnaId)
      .reduce((acc, question) => {
        acc[question.id] = question
        return acc
      }, {} as Record<number, QuestionType>)

    return { success: true, data: filteredQuestions }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const addQuestion = async (
  qnaId: number,
  content: string,
  author: string,
): Promise<ApiResponse<QuestionType>> => {
  try {
    // Validate inputs
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    if (!content || content.trim() === '') {
      return { success: false, error: 'Question content is required' }
    }

    if (!author || author.trim() === '') {
      return { success: false, error: 'Author is required' }
    }

    // Check if QnA exists
    if (!dataStore.qnas[qnaId]) {
      return { success: false, error: `QnA with ID ${qnaId} not found` }
    }

    // Check if QnA is active
    if (!dataStore.qnas[qnaId].isActive) {
      return { success: false, error: 'Cannot add question to inactive QnA' }
    }

    // Generate new ID
    const newId =
      Math.max(0, ...Object.keys(dataStore.questions).map(Number)) + 1

    // Create new question
    const newQuestion: QuestionType = {
      id: newId,
      timestamp: new Date(),
      content,
      author,
      likesCount: 0,
      likers: [],
      isAnswered: false,
      qnaId,
    }

    // Add to data store
    dataStore.questions[newId] = newQuestion

    // Update QnA's questionsIds
    dataStore.qnas[qnaId] = {
      ...dataStore.qnas[qnaId],
      questionsIds: [...dataStore.qnas[qnaId].questionsIds, newId],
    }

    // Notify subscribers
    notifySubscribers(ApiMessageType.QUESTION_MESSAGE, newQuestion)

    return { success: true, data: newQuestion }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Answer-related functions
export const getAnswers = async (): Promise<
  ApiResponse<Record<number, AnswerType>>
> => {
  try {
    return { success: true, data: dataStore.answers }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getAnswer = async (
  id: number,
): Promise<ApiResponse<AnswerType>> => {
  try {
    if (id === undefined || id === null) {
      return { success: false, error: 'Answer ID is required' }
    }

    const answer = dataStore.answers[id]
    if (!answer) {
      return { success: false, error: `Answer with ID ${id} not found` }
    }

    return { success: true, data: answer }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getAnswersByQuestionId = async (
  questionId: number,
): Promise<ApiResponse<Record<number, AnswerType>>> => {
  try {
    if (questionId === undefined || questionId === null) {
      return { success: false, error: 'Question ID is required' }
    }

    // Check if question exists
    if (!dataStore.questions[questionId]) {
      return {
        success: false,
        error: `Question with ID ${questionId} not found`,
      }
    }

    const filteredAnswers = Object.values(dataStore.answers)
      .filter((answer) => answer.questionId === questionId)
      .reduce((acc, answer) => {
        acc[answer.id] = answer
        return acc
      }, {} as Record<number, AnswerType>)

    return { success: true, data: filteredAnswers }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getAnswersByQnaId = async (
  qnaId: number,
): Promise<ApiResponse<Record<number, AnswerType>>> => {
  try {
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    // Check if QnA exists
    if (!dataStore.qnas[qnaId]) {
      return { success: false, error: `QnA with ID ${qnaId} not found` }
    }

    const filteredAnswers = Object.values(dataStore.answers)
      .filter((answer) => answer.qnaId === qnaId)
      .reduce((acc, answer) => {
        acc[answer.id] = answer
        return acc
      }, {} as Record<number, AnswerType>)

    return { success: true, data: filteredAnswers }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// QnA-related functions
export const getQnAs = async (): Promise<
  ApiResponse<Record<number, QnAType>>
> => {
  try {
    return { success: true, data: dataStore.qnas }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getQnA = async (id: number): Promise<ApiResponse<QnAType>> => {
  try {
    if (id === undefined || id === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    const qna = dataStore.qnas[id]
    if (!qna) {
      return { success: false, error: `QnA with ID ${id} not found` }
    }

    return { success: true, data: qna }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const addQnA = async (
  qnaData: Omit<QnAType, 'id' | 'questionsIds'>,
): Promise<ApiResponse<QnAType>> => {
  try {
    if (!qnaData.title) {
      return { success: false, error: 'QnA title is required' }
    }

    const newId =
      Object.keys(dataStore.qnas).length > 0
        ? Math.max(...Object.keys(dataStore.qnas).map(Number)) + 1
        : 1

    const newQnA: QnAType = {
      ...qnaData,
      id: newId,
      questionsIds: [],
      startDate: new Date(),
      isActive: true,
    }

    dataStore.qnas[newId] = newQnA

    return { success: true, data: newQnA }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Poll-related functions
export const getPolls = async (): Promise<
  ApiResponse<Record<number, PollType>>
> => {
  try {
    return { success: true, data: dataStore.polls }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getPoll = async (id: number): Promise<ApiResponse<PollType>> => {
  try {
    if (id === undefined || id === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    const poll = dataStore.polls[id]
    if (!poll) {
      return { success: false, error: `Poll with ID ${id} not found` }
    }

    return { success: true, data: poll }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getPollsByQnaId = async (
  qnaId: number,
): Promise<ApiResponse<Record<number, PollType>>> => {
  try {
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    // Check if QnA exists
    if (!dataStore.qnas[qnaId]) {
      return { success: false, error: `QnA with ID ${qnaId} not found` }
    }

    const filteredPolls = Object.values(dataStore.polls)
      .filter((poll) => poll.qnaId === qnaId)
      .reduce((acc, poll) => {
        acc[poll.id] = poll
        return acc
      }, {} as Record<number, PollType>)

    return { success: true, data: filteredPolls }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const addPoll = async (
  pollData: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>,
  pollOptions: { title: string; isCorrectAnswer?: boolean }[] = [],
): Promise<ApiResponse<PollType>> => {
  try {
    // Validate inputs
    if (!pollData) {
      return { success: false, error: 'Poll data is required' }
    }

    if (pollData.qnaId === undefined || pollData.qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    if (!pollData.title || pollData.title.trim() === '') {
      return { success: false, error: 'Poll title is required' }
    }

    if (!pollData.question || pollData.question.trim() === '') {
      return { success: false, error: 'Poll question is required' }
    }

    // Check if QnA exists
    if (!dataStore.qnas[pollData.qnaId]) {
      return {
        success: false,
        error: `QnA with ID ${pollData.qnaId} not found`,
      }
    }

    // Check if QnA is active
    if (!dataStore.qnas[pollData.qnaId].isActive) {
      return { success: false, error: 'Cannot add poll to inactive QnA' }
    }

    // Validate poll options
    if (!pollOptions || pollOptions.length < 2) {
      return { success: false, error: 'Poll must have at least 2 options' }
    }

    // Generate new poll ID
    const newPollId =
      Math.max(0, ...Object.keys(dataStore.polls).map(Number)) + 1

    // Create poll options
    const optionIds: number[] = []
    const correctAnswersIds: number[] = []

    for (const option of pollOptions) {
      // Generate new option ID
      const newOptionId =
        Math.max(0, ...Object.keys(dataStore.pollOptions).map(Number)) + 1

      // Create new poll option
      const newPollOption: PollOptionType = {
        id: newOptionId,
        title: option.title,
        voteCount: 0,
        voters: [],
        pollId: newPollId,
      }

      // Add to data store
      dataStore.pollOptions[newOptionId] = newPollOption

      // Add to option IDs
      optionIds.push(newOptionId)

      // If this option is marked as a correct answer, add it to correctAnswersIds
      if (option.isCorrectAnswer && pollData.hasCorrectAnswers) {
        correctAnswersIds.push(newOptionId)
      }
    }

    // Create new poll with option IDs and correct answers IDs
    const newPoll: PollType = {
      id: newPollId,
      ...pollData,
      optionsIds: optionIds,
      correctAnswersIds: pollData.hasCorrectAnswers
        ? correctAnswersIds
        : undefined,
    }

    // If hasCorrectAnswers is true, validate correctAnswersIds
    if (newPoll.hasCorrectAnswers && correctAnswersIds.length === 0) {
      return {
        success: false,
        error:
          'Poll with correct answers must specify at least one correct answer',
      }
    }

    // Add to data store
    dataStore.polls[newPollId] = newPoll

    // Notify subscribers
    notifySubscribers(ApiMessageType.POLL_CREATE_MESSAGE, newPoll)

    return { success: true, data: newPoll }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Poll option-related functions
export const getPollOptions = async (): Promise<
  ApiResponse<Record<number, PollOptionType>>
> => {
  try {
    return { success: true, data: dataStore.pollOptions }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getPollOption = async (
  id: number,
): Promise<ApiResponse<PollOptionType>> => {
  try {
    if (id === undefined || id === null) {
      return { success: false, error: 'Poll option ID is required' }
    }

    const pollOption = dataStore.pollOptions[id]
    if (!pollOption) {
      return { success: false, error: `Poll option with ID ${id} not found` }
    }

    return { success: true, data: pollOption }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getPollOptionsByPollId = async (
  pollId: number,
): Promise<ApiResponse<Record<number, PollOptionType>>> => {
  try {
    if (pollId === undefined || pollId === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    // Check if poll exists
    if (!dataStore.polls[pollId]) {
      return { success: false, error: `Poll with ID ${pollId} not found` }
    }

    const filteredOptions = Object.values(dataStore.pollOptions)
      .filter((option) => option.pollId === pollId)
      .reduce((acc, option) => {
        acc[option.id] = option
        return acc
      }, {} as Record<number, PollOptionType>)

    return { success: true, data: filteredOptions }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const votePoll = async (
  pollId: number,
  optionIds: number[],
  voter: string,
): Promise<ApiResponse<PollOptionType[]>> => {
  try {
    // Validate inputs
    if (pollId === undefined || pollId === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    if (!optionIds || !Array.isArray(optionIds) || optionIds.length === 0) {
      return { success: false, error: 'At least one option ID is required' }
    }

    if (!voter || voter.trim() === '') {
      return { success: false, error: 'Voter identifier is required' }
    }

    // Check if poll exists
    if (!dataStore.polls[pollId]) {
      return { success: false, error: `Poll with ID ${pollId} not found` }
    }

    // Check if poll is active
    if (!dataStore.polls[pollId].isActive) {
      return { success: false, error: `Poll with ID ${pollId} is not active` }
    }

    // Check if poll has an active until date and if it's expired
    if (
      dataStore.polls[pollId].activeUntil &&
      new Date() > new Date(dataStore.polls[pollId].activeUntil as Date)
    ) {
      // Update poll to inactive if it's expired
      dataStore.polls[pollId] = {
        ...dataStore.polls[pollId],
        isActive: false,
      }

      // Notify subscribers about poll status change
      notifySubscribers(
        ApiMessageType.POLL_ACTIVE_MESSAGE,
        dataStore.polls[pollId],
      )

      return { success: false, error: `Poll with ID ${pollId} has expired` }
    }

    // Check if multiple options are allowed
    if (
      optionIds.length > 1 &&
      !dataStore.polls[pollId].hasMultipleOptionsSelect
    ) {
      return {
        success: false,
        error: `Poll with ID ${pollId} does not allow multiple options selection`,
      }
    }

    // Check if user has already voted
    const isUserVoted = Object.values(dataStore.pollOptions)
      .filter((option) => option.pollId === pollId)
      .some((option) => option.voters.includes(voter))

    if (isUserVoted && !dataStore.polls[pollId].hasMultipleOptionsSelect) {
      return {
        success: false,
        error: `User ${voter} has already voted in poll with ID ${pollId}`,
      }
    }

    // Validate all option IDs
    for (const optionId of optionIds) {
      // Check if option exists
      if (!dataStore.pollOptions[optionId]) {
        return {
          success: false,
          error: `Poll option with ID ${optionId} not found`,
        }
      }

      // Check if option belongs to poll
      if (dataStore.pollOptions[optionId].pollId !== pollId) {
        return {
          success: false,
          error: `Poll option with ID ${optionId} does not belong to poll with ID ${pollId}`,
        }
      }

      // Check if user has already voted for this specific option
      if (dataStore.pollOptions[optionId].voters.includes(voter)) {
        return {
          success: false,
          error: `User ${voter} has already voted for option with ID ${optionId}`,
        }
      }
    }

    // Update options
    const updatedOptions: PollOptionType[] = []

    for (const optionId of optionIds) {
      const updatedOption: PollOptionType = {
        ...dataStore.pollOptions[optionId],
        voteCount: dataStore.pollOptions[optionId].voteCount + 1,
        voters: [...dataStore.pollOptions[optionId].voters, voter],
      }

      // Update data store
      dataStore.pollOptions[optionId] = updatedOption
      updatedOptions.push(updatedOption)

      // Notify subscribers for each option
      notifySubscribers(ApiMessageType.POLL_VOTE_MESSAGE, updatedOption)
    }

    return { success: true, data: updatedOptions }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Update existing functions to use the data store instead of Jotai atoms
export const likeQuestion = async (
  questionId: number,
  userId: string,
): Promise<ApiResponse<QuestionType>> => {
  try {
    // Validate inputs
    if (questionId === undefined || questionId === null) {
      return { success: false, error: 'Question ID is required' }
    }

    if (!userId || userId.trim() === '') {
      return { success: false, error: 'User ID is required' }
    }

    const question = dataStore.questions[questionId]
    if (!question) {
      return {
        success: false,
        error: `Question with ID ${questionId} not found`,
      }
    }

    // Check if QnA is active
    const qna = dataStore.qnas[question.qnaId]
    if (!qna || !qna.isActive) {
      return {
        success: false,
        error: 'Cannot like a question in an inactive QnA',
      }
    }

    const hasLiked = question.likers.includes(userId)

    const updatedQuestion = {
      ...question,
      likesCount: hasLiked ? question.likesCount - 1 : question.likesCount + 1,
      likers: hasLiked
        ? question.likers.filter((liker: string) => liker !== userId)
        : [...question.likers, userId],
    }

    // Update data store
    dataStore.questions[questionId] = updatedQuestion

    // Notify subscribers
    notifySubscribers(ApiMessageType.UPVOTE_MESSAGE, updatedQuestion)

    return { success: true, data: updatedQuestion }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const likeAnswer = async (
  answerId: number,
  userId: string,
): Promise<ApiResponse<AnswerType>> => {
  try {
    // Validate inputs
    if (answerId === undefined || answerId === null) {
      return { success: false, error: 'Answer ID is required' }
    }

    if (!userId || userId.trim() === '') {
      return { success: false, error: 'User ID is required' }
    }

    const answer = dataStore.answers[answerId]
    if (!answer) {
      return { success: false, error: `Answer with ID ${answerId} not found` }
    }

    // Check if QnA is active
    const qna = dataStore.qnas[answer.qnaId]
    if (!qna || !qna.isActive) {
      return {
        success: false,
        error: 'Cannot like an answer in an inactive QnA',
      }
    }

    const hasLiked = answer.likers.includes(userId)

    const updatedAnswer = {
      ...answer,
      likesCount: hasLiked ? answer.likesCount - 1 : answer.likesCount + 1,
      likers: hasLiked
        ? answer.likers.filter((liker: string) => liker !== userId)
        : [...answer.likers, userId],
    }

    // Update data store
    dataStore.answers[answerId] = updatedAnswer

    // Notify subscribers
    notifySubscribers(ApiMessageType.UPVOTE_MESSAGE, updatedAnswer)

    return { success: true, data: updatedAnswer }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const addAnswer = async (
  questionId: number,
  qnaId: number,
  content: string,
  author: string,
): Promise<ApiResponse<AnswerType>> => {
  try {
    // Validate inputs
    if (questionId === undefined || questionId === null) {
      return { success: false, error: 'Question ID is required' }
    }

    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    if (!content || content.trim() === '') {
      return { success: false, error: 'Answer content is required' }
    }

    if (!author || author.trim() === '') {
      return { success: false, error: 'Author is required' }
    }

    // Check if question exists
    const question = dataStore.questions[questionId]
    if (!question) {
      return {
        success: false,
        error: `Question with ID ${questionId} not found`,
      }
    }

    // Verify question belongs to the specified QnA
    if (question.qnaId !== qnaId) {
      return {
        success: false,
        error: `Question with ID ${questionId} does not belong to QnA with ID ${qnaId}`,
      }
    }

    // Check if QnA exists
    const qna = dataStore.qnas[qnaId]
    if (!qna) {
      return { success: false, error: `QnA with ID ${qnaId} not found` }
    }

    // Check if QnA is active
    if (!qna.isActive) {
      return { success: false, error: 'Cannot add answer to inactive QnA' }
    }

    // Check if user is allowed to answer
    if (!qna.allowsParticipantsReplies) {
      // If QnA has admins, check if author is an admin
      if (
        qna.hasAdmins &&
        qna.admins &&
        !qna.admins.includes(author) &&
        author !== qna.owner
      ) {
        return {
          success: false,
          error: 'Only admins can answer questions in this QnA',
        }
      }
    }

    const newId = Math.max(0, ...Object.keys(dataStore.answers).map(Number)) + 1

    const newAnswer: AnswerType = {
      id: newId,
      questionId,
      qnaId,
      content,
      author,
      timestamp: new Date(),
      likesCount: 0,
      likers: [],
    }

    // Update data store
    dataStore.answers[newId] = newAnswer

    // Notify subscribers
    notifySubscribers(ApiMessageType.ANSWER_MESSAGE, newAnswer)

    return { success: true, data: newAnswer }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const toggleQuestionAnswered = async (
  questionId: number,
): Promise<ApiResponse<QuestionType>> => {
  try {
    // Validate input
    if (questionId === undefined || questionId === null) {
      return { success: false, error: 'Question ID is required' }
    }

    const question = dataStore.questions[questionId]
    if (!question) {
      return {
        success: false,
        error: `Question with ID ${questionId} not found`,
      }
    }

    // Check if QnA is active
    const qna = dataStore.qnas[question.qnaId]
    if (!qna || !qna.isActive) {
      return {
        success: false,
        error: 'Cannot toggle answer status in an inactive QnA',
      }
    }

    // Check if there are any answers for this question
    const hasAnswers = Object.values(dataStore.answers).some(
      (answer) => answer.questionId === questionId,
    )

    // If trying to mark as answered but there are no answers, prevent it
    if (!question.isAnswered && !hasAnswers) {
      return {
        success: false,
        error: 'Cannot mark a question as answered when it has no answers',
      }
    }

    const updatedQuestion = {
      ...question,
      isAnswered: !question.isAnswered,
    }

    // Update data store
    dataStore.questions[questionId] = updatedQuestion

    // Notify subscribers
    notifySubscribers(ApiMessageType.ANSWERED_MESSAGE, updatedQuestion)

    return { success: true, data: updatedQuestion }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const updateQnA = async (
  qnaId: number,
  qnaData: Partial<QnAType>,
): Promise<ApiResponse<QnAType>> => {
  try {
    // Validate input
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    const qna = dataStore.qnas[qnaId]
    if (!qna) {
      return { success: false, error: `QnA with ID ${qnaId} not found` }
    }

    // Update qna data
    const updatedQnA: QnAType = {
      ...qna,
      ...qnaData,
    }

    // Update data store
    dataStore.qnas[qnaId] = updatedQnA

    // If QnA is being set to inactive, also set all related polls to inactive
    if (qnaData.isActive === false && qna.isActive === true) {
      // Find all polls for this QnA
      const relatedPolls = Object.values(dataStore.polls).filter(
        (poll) => poll.qnaId === qnaId && poll.isActive,
      )

      // Update each poll
      for (const poll of relatedPolls) {
        const updatedPoll = {
          ...poll,
          isActive: false,
        }

        // Update in data store
        dataStore.polls[poll.id] = updatedPoll

        // Notify subscribers
        notifySubscribers(ApiMessageType.POLL_UPDATE_MESSAGE, updatedPoll)
        notifySubscribers(ApiMessageType.POLL_ACTIVE_MESSAGE, updatedPoll)
      }
    }

    // Notify subscribers
    notifySubscribers(ApiMessageType.QNA_UPDATE_MESSAGE, updatedQnA)

    return { success: true, data: updatedQnA }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const updatePoll = async (
  pollId: number,
  pollData: Partial<PollType>,
): Promise<ApiResponse<PollType>> => {
  try {
    // Validate input
    if (pollId === undefined || pollId === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    const poll = dataStore.polls[pollId]
    if (!poll) {
      return { success: false, error: `Poll with ID ${pollId} not found` }
    }

    // Update poll data
    const updatedPoll: PollType = {
      ...poll,
      ...pollData,
    }

    // Update data store
    dataStore.polls[pollId] = updatedPoll

    // Notify subscribers
    notifySubscribers(ApiMessageType.POLL_UPDATE_MESSAGE, updatedPoll)

    // If isActive status has changed, also notify with POLL_ACTIVE_MESSAGE
    if (
      pollData.isActive !== undefined &&
      pollData.isActive !== poll.isActive
    ) {
      notifySubscribers(ApiMessageType.POLL_ACTIVE_MESSAGE, updatedPoll)
    }

    return { success: true, data: updatedPoll }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const subscribe = <T>(
  messageType: ApiMessageType,
  callback: SubscriptionCallback<T>,
  filter?: SubscriptionFilter,
): (() => void) => {
  const id = Math.random().toString(36).substring(2, 9)

  // Validate filter if provided
  if (filter) {
    // Ensure QnA exists if qnaId is provided
    if (filter.qnaId !== undefined && !dataStore.qnas[filter.qnaId]) {
      console.warn(`Subscribing to non-existent QnA ID: ${filter.qnaId}`)
    }

    // Ensure poll exists if pollId is provided
    if (filter.pollId !== undefined && !dataStore.polls[filter.pollId]) {
      console.warn(`Subscribing to non-existent Poll ID: ${filter.pollId}`)
    }

    // Ensure question exists if questionId is provided
    if (
      filter.questionId !== undefined &&
      !dataStore.questions[filter.questionId]
    ) {
      console.warn(
        `Subscribing to non-existent Question ID: ${filter.questionId}`,
      )
    }
  }

  subscribers.push({ messageType, callback, id, filter })

  return () => {
    const index = subscribers.findIndex((sub) => sub.id === id)
    if (index !== -1) {
      subscribers.splice(index, 1)
    }
  }
}

export const deleteQnA = async (
  qnaId: number,
): Promise<ApiResponse<boolean>> => {
  try {
    // Validate input
    if (qnaId === undefined || qnaId === null) {
      return { success: false, error: 'QnA ID is required' }
    }

    const qna = dataStore.qnas[qnaId]
    if (!qna) {
      return { success: false, error: `QnA with ID ${qnaId} not found` }
    }

    // Find all related polls and delete them
    const relatedPollIds = Object.values(dataStore.polls)
      .filter((poll) => poll.qnaId === qnaId)
      .map((poll) => poll.id)

    // Delete all related polls
    for (const pollId of relatedPollIds) {
      // Delete poll options
      const pollOptionIds = Object.values(dataStore.pollOptions)
        .filter((option) => option.pollId === pollId)
        .map((option) => option.id)

      for (const optionId of pollOptionIds) {
        delete dataStore.pollOptions[optionId]
      }

      // Notify subscribers about poll deletion
      notifySubscribers(ApiMessageType.POLL_DELETE_MESSAGE, {
        pollId,
        qnaId,
      })

      // Delete the poll
      delete dataStore.polls[pollId]
    }

    // Delete all related questions and answers
    const questionIds = qna.questionsIds

    for (const questionId of questionIds) {
      // Delete answers for this question
      const answerIds = Object.values(dataStore.answers)
        .filter((answer) => answer.questionId === questionId)
        .map((answer) => answer.id)

      for (const answerId of answerIds) {
        delete dataStore.answers[answerId]
      }

      // Delete the question
      delete dataStore.questions[questionId]
    }

    // Notify subscribers about QnA deletion
    notifySubscribers(ApiMessageType.QNA_DELETE_MESSAGE, {
      qnaId,
      title: qna.title,
    })

    // Delete the QnA
    delete dataStore.qnas[qnaId]

    return { success: true, data: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const deletePoll = async (
  pollId: number,
): Promise<ApiResponse<boolean>> => {
  try {
    // Validate input
    if (pollId === undefined || pollId === null) {
      return { success: false, error: 'Poll ID is required' }
    }

    const poll = dataStore.polls[pollId]
    if (!poll) {
      return { success: false, error: `Poll with ID ${pollId} not found` }
    }

    // Delete poll options
    const pollOptionIds = Object.values(dataStore.pollOptions)
      .filter((option) => option.pollId === pollId)
      .map((option) => option.id)

    for (const optionId of pollOptionIds) {
      delete dataStore.pollOptions[optionId]
    }

    // Notify subscribers about poll deletion
    notifySubscribers(ApiMessageType.POLL_DELETE_MESSAGE, {
      pollId,
      qnaId: poll.qnaId,
      title: poll.title,
    })

    // Delete the poll
    delete dataStore.polls[pollId]

    return { success: true, data: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
