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
  startDate?: Date
  endDate?: Date
  setQnasRecord: (
    updater: (prev: Record<string, QnAType>) => Record<string, QnAType>,
  ) => void
}

// QnAs

export const loadAndGetQna = async ({
  qnaId,
  setQnasRecord,
}: {
  qnaId: string
  setQnasRecord: (
    updater: (prev: Record<string, QnAType>) => Record<string, QnAType>,
  ) => void
}): Promise<QnAType | null> => {
  try {
    const qnaResponse = await apiConnector.getQnA(qnaId)

    if (qnaResponse.success && qnaResponse.data) {
      const qnaData = qnaResponse.data
      setQnasRecord((prev) => ({
        ...prev,
        [qnaData.id]: qnaData,
      }))
      return qnaData
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
  startDate,
  endDate,
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
      startDate: startDate || new Date(),
      endDate,
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

export const deleteQnA = async (
  qnaId: string,
): Promise<ApiResponse<boolean>> => {
  try {
    return await apiConnector.deleteQnA(qnaId)
  } catch (error) {
    console.error('Error deleting QnA:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const updateQnA = async (
  qnaId: string,
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

export const startQnA = async (
  qnaId: string,
): Promise<ApiResponse<QnAType>> => {
  try {
    return await updateQnA(qnaId, { isActive: true, startDate: new Date() })
  } catch (error) {
    console.error('Error starting QnA:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const endQnA = async (qnaId: string): Promise<ApiResponse<QnAType>> => {
  try {
    return await updateQnA(qnaId, { isActive: false, endDate: new Date() })
  } catch (error) {
    console.error('Error ending QnA:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const openQnA = async (qnaId: string): Promise<ApiResponse<QnAType>> => {
  try {
    return await updateQnA(qnaId, { isActive: true, startDate: new Date() })
  } catch (error) {
    console.error('Error opening QnA:', error)
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
  qnaId: string
  setQuestionsRecord: (
    updater: (
      prev: Record<string, QuestionType>,
    ) => Record<string, QuestionType>,
  ) => void
  setAnswersRecord: (
    updater: (prev: Record<string, AnswerType>) => Record<string, AnswerType>,
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

// Questions

export const addNewQuestion = async ({
  qnaId,
  content,
  author,
}: {
  qnaId: string
  content: string
  author?: string
}): Promise<ApiResponse<QuestionType>> => {
  try {
    console.log(author)
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
  qnaId,
  questionId,
}: {
  qnaId: string
  questionId: string
}): Promise<ApiResponse<QuestionType>> => {
  try {
    return await apiConnector.likeQuestion(qnaId, questionId)
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
  questionId: string,
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

// Answers

export const addNewAnswer = async ({
  questionId,
  qnaId,
  content,
  author,
}: {
  questionId: string
  qnaId: string
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
  qnaId,
  questionId,
  answerId,
}: {
  qnaId: string
  questionId: string
  answerId: string
}): Promise<ApiResponse<AnswerType>> => {
  try {
    return await apiConnector.likeAnswer(qnaId, questionId, answerId)
  } catch (error) {
    console.error('Error liking answer:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Polls

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

export const deletePoll = async (
  pollId: string,
): Promise<ApiResponse<boolean>> => {
  try {
    return await apiConnector.deletePoll(pollId)
  } catch (error) {
    console.error('Error deleting Poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const updatePoll = async (
  pollId: string,
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
  qnaId,
  pollId,
  optionId,
}: {
  qnaId: string
  pollId: string
  optionId: number
}): Promise<ApiResponse<PollOptionType[]>> => {
  try {
    return await apiConnector.votePoll(qnaId, pollId, optionId)
  } catch (error) {
    console.error('Error voting in poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const startPoll = async (
  pollId: string,
): Promise<ApiResponse<PollType>> => {
  try {
    return await updatePoll(pollId, { isActive: true })
  } catch (error) {
    console.error('Error starting Poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const endPoll = async (
  pollId: string,
): Promise<ApiResponse<PollType>> => {
  try {
    return await updatePoll(pollId, { isActive: false })
  } catch (error) {
    console.error('Error ending Poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Function to load poll options for a specific poll
export const loadPollOptions = async ({
  qnaId,
  pollId,
  setPollOptionsRecord,
}: {
  qnaId: string
  pollId: string
  setPollOptionsRecord: (
    updater: (
      prev: Record<string, PollOptionType>,
    ) => Record<string, PollOptionType>,
  ) => void
}): Promise<void> => {
  try {
    const optionsResponse = await apiConnector.getPollOptionsByPollId(
      qnaId,
      pollId,
    )
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
  qnaId: string
  setPollsRecord: (
    updater: (prev: Record<string, PollType>) => Record<string, PollType>,
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
