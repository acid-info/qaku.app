import { atom } from 'jotai'
import { questionsRecordAtom } from './questionsRecordAtom'

export const questionIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const questionsRecord = get(questionsRecordAtom)
    return Object.values(questionsRecord)
      .filter((question) => question.qnaId === qnaId)
      .map((question) => question.id)
  })
