import { AnswerType, QuestionType } from '@/types/qna.types'
import { getDefaultStore } from 'jotai'
import { answersRecordAtom } from '../../../../atoms/answerAtom'
import { questionsRecordAtom } from '../../../../atoms/questionAtom'
import { ApiMessageType, ApiResponse, SubscriptionCallback } from '../types'

type Subscriber = {
  messageType: ApiMessageType
  callback: (data: any) => void
  id: string
}

const subscribers: Subscriber[] = []

const notifySubscribers = (messageType: ApiMessageType, data: any) => {
  subscribers
    .filter((sub) => sub.messageType === messageType)
    .forEach((sub) => sub.callback(data))
}

const store = getDefaultStore()

export const likeQuestion = async (
  questionId: number,
  userId: string,
): Promise<ApiResponse<QuestionType>> => {
  try {
    const questionsRecord = store.get(questionsRecordAtom)

    const question = questionsRecord[questionId]
    if (!question) {
      return { success: false, error: 'Question not found' }
    }

    const hasLiked = question.likers.includes(userId)

    const updatedQuestion = {
      ...question,
      likesCount: hasLiked ? question.likesCount - 1 : question.likesCount + 1,
      likers: hasLiked
        ? question.likers.filter((liker: string) => liker !== userId)
        : [...question.likers, userId],
    }

    store.set(questionsRecordAtom, {
      ...questionsRecord,
      [questionId]: updatedQuestion,
    })

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
    const answersRecord = store.get(answersRecordAtom)

    const answer = answersRecord[answerId]
    if (!answer) {
      return { success: false, error: 'Answer not found' }
    }

    const hasLiked = answer.likers.includes(userId)

    const updatedAnswer = {
      ...answer,
      likesCount: hasLiked ? answer.likesCount - 1 : answer.likesCount + 1,
      likers: hasLiked
        ? answer.likers.filter((liker: string) => liker !== userId)
        : [...answer.likers, userId],
    }

    store.set(answersRecordAtom, {
      ...answersRecord,
      [answerId]: updatedAnswer,
    })

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
    const answersRecord = store.get(answersRecordAtom)

    const newId = Math.max(0, ...Object.keys(answersRecord).map(Number)) + 1

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

    store.set(answersRecordAtom, {
      ...answersRecord,
      [newId]: newAnswer,
    })

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
    const questionsRecord = store.get(questionsRecordAtom)

    const question = questionsRecord[questionId]
    if (!question) {
      return { success: false, error: 'Question not found' }
    }

    const updatedQuestion = {
      ...question,
      isAnswered: !question.isAnswered,
    }

    store.set(questionsRecordAtom, {
      ...questionsRecord,
      [questionId]: updatedQuestion,
    })

    notifySubscribers(ApiMessageType.ANSWERED_MESSAGE, updatedQuestion)

    return { success: true, data: updatedQuestion }
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
): (() => void) => {
  const id = Math.random().toString(36).substring(2, 9)
  subscribers.push({ messageType, callback, id })

  return () => {
    const index = subscribers.findIndex((sub) => sub.id === id)
    if (index !== -1) {
      subscribers.splice(index, 1)
    }
  }
}
