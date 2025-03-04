import { AnswerType } from '@/types/qna.types'
import { atom } from 'jotai'

export const answersRecordAtom = atom<Record<number, AnswerType>>({})

export const answerIdsAtom = atom<number[]>((get) =>
  Object.keys(get(answersRecordAtom)).map((id) => parseInt(id)),
)

export const answerIdsByQuestionIdAtom = (questionId: number) =>
  atom<number[]>((get) => {
    const answersRecord = get(answersRecordAtom)
    return Object.values(answersRecord)
      .filter((answer) => answer.questionId === questionId)
      .map((answer) => answer.id)
  })

export const answerIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const answersRecord = get(answersRecordAtom)
    return Object.values(answersRecord)
      .filter((answer) => answer.qnaId === qnaId)
      .map((answer) => answer.id)
  })

export const getAnswerByIdAtom = (id: number) =>
  atom((get) => get(answersRecordAtom)[id])
