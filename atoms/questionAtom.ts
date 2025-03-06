import { QuestionType } from '@/types/qna.types'
import { atom } from 'jotai'

export const questionsRecordAtom = atom<Record<number, QuestionType>>({})

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

export const getQuestionByIdAtom = (id: number) =>
  atom((get) => get(questionsRecordAtom)[id])
