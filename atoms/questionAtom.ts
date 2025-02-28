import { mockQuestions } from '@/data/mockQuestions'
import { QuestionType } from '@/types/qna.types'
import { atom } from 'jotai'

export const questionsRecordAtom = atom<Record<number, QuestionType>>(
  mockQuestions.reduce((acc, question) => {
    acc[question.id] = question
    return acc
  }, {} as Record<number, QuestionType>),
)

export const questionIdsAtom = atom<number[]>((get) =>
  Object.keys(get(questionsRecordAtom)).map((id) => parseInt(id)),
)

export const questionIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const questionsRecord = get(questionsRecordAtom)
    return Object.values(questionsRecord)
      .filter((question) => question.qnaId === qnaId)
      .map((question) => question.id)
  })

export const answeredQuestionIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const questionsRecord = get(questionsRecordAtom)
    return Object.values(questionsRecord)
      .filter((question) => question.qnaId === qnaId && question.isAnswered)
      .map((question) => question.id)
  })

export const unansweredQuestionIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const questionsRecord = get(questionsRecordAtom)
    return Object.values(questionsRecord)
      .filter((question) => question.qnaId === qnaId && !question.isAnswered)
      .map((question) => question.id)
  })

export const getQuestionByIdAtom = (id: number) =>
  atom((get) => get(questionsRecordAtom)[id])

export const questionStatsByQnaIdAtom = (qnaId: number) =>
  atom((get) => {
    const questionsRecord = get(questionsRecordAtom)
    const questionIds = get(questionIdsByQnaIdAtom(qnaId))

    const answeredCount = questionIds.filter(
      (id) => questionsRecord[id].isAnswered,
    ).length

    return {
      total: questionIds.length,
      answered: answeredCount,
      unanswered: questionIds.length - answeredCount,
    }
  })
