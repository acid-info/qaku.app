import { atom } from 'jotai'
import { answersRecordAtom } from './answersRecordAtom'

export const answerIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const answersRecord = get(answersRecordAtom)
    return Object.values(answersRecord)
      .filter((answer) => answer.qnaId === qnaId)
      .map((answer) => answer.id)
  })
