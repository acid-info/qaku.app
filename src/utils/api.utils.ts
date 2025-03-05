import { apiConnector } from '@/lib/api/connector'
import { ApiResponse } from '@/lib/api/types'
import {
  AnswerType,
  PollOptionType,
  PollType,
  QuestionType,
} from '@/types/qna.types'

// Function to load questions and answers for a specific QnA
export const loadQnaData = async (
  qnaId: number,
  setQuestionsRecord: (
    updater: (
      prev: Record<number, QuestionType>,
    ) => Record<number, QuestionType>,
  ) => void,
  setAnswersRecord: (
    updater: (prev: Record<number, AnswerType>) => Record<number, AnswerType>,
  ) => void,
): Promise<void> => {
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
export const loadPollOptions = async (
  pollId: number,
  setPollOptionsRecord: (
    updater: (
      prev: Record<number, PollOptionType>,
    ) => Record<number, PollOptionType>,
  ) => void,
): Promise<void> => {
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

export const addNewQuestion = async (
  qnaId: number,
  content: string,
  author: string,
): Promise<ApiResponse<QuestionType>> => {
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

export const likeQuestionById = async (
  questionId: number,
  userId: string,
): Promise<ApiResponse<QuestionType>> => {
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

export const addNewAnswer = async (
  questionId: number,
  qnaId: number,
  content: string,
  author: string,
): Promise<ApiResponse<AnswerType>> => {
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

export const likeAnswerById = async (
  answerId: number,
  userId: string,
): Promise<ApiResponse<AnswerType>> => {
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
  pollData: Omit<PollType, 'id'>,
): Promise<ApiResponse<PollType>> => {
  try {
    return await apiConnector.addPoll(pollData)
  } catch (error) {
    console.error('Error creating poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const voteInPoll = async (
  pollId: number,
  optionId: number,
  voter: string,
): Promise<ApiResponse<PollOptionType>> => {
  try {
    return await apiConnector.votePoll(pollId, optionId, voter)
  } catch (error) {
    console.error('Error voting in poll:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
