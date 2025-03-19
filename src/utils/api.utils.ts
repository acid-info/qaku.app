import { apiConnector } from '@/lib/api/connector'
import { ApiResponse } from '@/lib/api/types'
import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'

type QnaCreateParams = {
  title: string
  description?: string
  owner: string
  hasAdmins?: boolean
  admins?: string[]
  allowsParticipantsReplies?: boolean
  hash: string
  setQnasRecord: (
    updater: (prev: Record<number, QnAType>) => Record<number, QnAType>,
  ) => void
}

export const loadAndGetQna = async ({
  qnaId,
  setQnasRecord,
}: {
  qnaId: number
  setQnasRecord: (
    updater: (prev: Record<number, QnAType>) => Record<number, QnAType>,
  ) => void
}): Promise<QnAType | null> => {
  try {
    const qnaResponse = await apiConnector.getQnA(qnaId)
    if (qnaResponse.success && qnaResponse.data) {
      setQnasRecord((prev) => ({
        ...prev,
        ...qnaResponse.data,
      }))
      return qnaResponse.data
    }
  } catch (error) {
    console.error(`Error loading QnA ${qnaId}:`, error)
  }
  return null
}

export const createQnA = async ({
  title,
  description,
  owner,
  hasAdmins = false,
  admins = [],
  allowsParticipantsReplies = true,
  hash,
  setQnasRecord,
}: QnaCreateParams): Promise<ApiResponse<QnAType>> => {
  try {
    const qnaData: Omit<QnAType, 'id' | 'questionsIds'> = {
      title,
      description,
      owner,
      hasAdmins,
      admins,
      allowsParticipantsReplies,
      hash,
      startDate: new Date(),
      isActive: true,
    }

    const response = await apiConnector.addQnA(qnaData)

    if (response.success && response.data) {
      setQnasRecord((prev) => ({
        ...prev,
        [response.data!.id]: response.data!,
      }))
    }

    return response
  } catch (error) {
    console.error('Error creating QnA:', error)
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
    return await apiConnector.updateQnA(qnaId, qnaData)
  } catch (error) {
    console.error('Error updating QnA:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Function to load questions and answers for a specific QnA
export const loadQnaData = async ({
  qnaId,
  setQuestionsRecord,
  setAnswersRecord,
}: {
  qnaId: number
  setQuestionsRecord: (
    updater: (
      prev: Record<number, QuestionType>,
    ) => Record<number, QuestionType>,
  ) => void
  setAnswersRecord: (
    updater: (prev: Record<number, AnswerType>) => Record<number, AnswerType>,
  ) => void
}): Promise<void> => {
  try {
    // Load questions for this QnA
    const questionsResponse = await apiConnector.getQuestionsByQnaId(qnaId)
    if (questionsResponse.success && questionsResponse.data) {
      setQuestionsRecord((prev) => ({
        ...prev,
        ...questionsResponse.data,
      }))
    }

    // Load answers for this QnA
    const answersResponse = await apiConnector.getAnswersByQnaId(qnaId)
    if (answersResponse.success && answersResponse.data) {
      setAnswersRecord((prev) => ({
        ...prev,
        ...answersResponse.data,
      }))
    }
  } catch (error) {
    console.error(`Error loading data for QnA ${qnaId}:`, error)
  }
}

// Function to load poll options for a specific poll
export const loadPollOptions = async ({
  pollId,
  setPollOptionsRecord,
}: {
  pollId: number
  setPollOptionsRecord: (
    updater: (
      prev: Record<number, PollOptionType>,
    ) => Record<number, PollOptionType>,
  ) => void
}): Promise<void> => {
  try {
    const optionsResponse = await apiConnector.getPollOptionsByPollId(pollId)
    if (optionsResponse.success && optionsResponse.data) {
      setPollOptionsRecord((prev) => ({
        ...prev,
        ...optionsResponse.data,
      }))
    }
  } catch (error) {
    console.error(`Error loading options for poll ${pollId}:`, error)
  }
}

export const loadPollsByQnaId = async ({
  qnaId,
  setPollsRecord,
}: {
  qnaId: number
  setPollsRecord: (
    updater: (prev: Record<number, PollType>) => Record<number, PollType>,
  ) => void
}): Promise<void> => {
  try {
    const pollsResponse = await apiConnector.getPollsByQnaId(qnaId)
    if (pollsResponse.success && pollsResponse.data) {
      setPollsRecord((prev) => ({
        ...prev,
        ...pollsResponse.data,
      }))
    }
  } catch (error) {
    console.error(`Error loading polls for QnA ${qnaId}:`, error)
  }
}

export const addNewQuestion = async ({
  qnaId,
  content,
  author,
}: {
  qnaId: number
  content: string
  author: string
}): Promise<ApiResponse<QuestionType>> => {
  try {
    return await apiConnector.addQuestion(qnaId, content, author)
  } catch (error) {
    console.error('Error adding question:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const likeQuestionById = async ({
  questionId,
  userId,
}: {
  questionId: number
  userId: string
}): Promise<ApiResponse<QuestionType>> => {
  try {
    return await apiConnector.likeQuestion(questionId, userId)
  } catch (error) {
    console.error('Error liking question:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Toggle the answered status of a question
export const toggleQuestionAnsweredStatus = async (
  questionId: number,
): Promise<ApiResponse<QuestionType>> => {
  try {
    return await apiConnector.toggleQuestionAnswered(questionId)
  } catch (error) {
    console.error('Error toggling question answered status:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const addNewAnswer = async ({
  questionId,
  qnaId,
  content,
  author,
}: {
  questionId: number
  qnaId: number
  content: string
  author: string
}): Promise<ApiResponse<AnswerType>> => {
  try {
    return await apiConnector.addAnswer(questionId, qnaId, content, author)
  } catch (error) {
    console.error('Error adding answer:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const likeAnswerById = async ({
  answerId,
  userId,
}: {
  answerId: number
  userId: string
}): Promise<ApiResponse<AnswerType>> => {
  try {
    return await apiConnector.likeAnswer(answerId, userId)
  } catch (error) {
    console.error('Error liking answer:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const createNewPoll = async (
  pollData: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>,
  pollOptions: { title: string; isCorrectAnswer?: boolean }[] = [],
): Promise<ApiResponse<PollType>> => {
  try {
    return await apiConnector.addPoll(pollData, pollOptions)
  } catch (error) {
    console.error('Error creating poll:', error)
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
    return await apiConnector.updatePoll(pollId, pollData)
  } catch (error) {
    console.error('Error updating Poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const voteInPoll = async ({
  pollId,
  optionIds,
  voter,
}: {
  pollId: number
  optionIds: number[]
  voter: string
}): Promise<ApiResponse<PollOptionType[]>> => {
  try {
    return await apiConnector.votePoll(pollId, optionIds, voter)
  } catch (error) {
    console.error('Error voting in poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
