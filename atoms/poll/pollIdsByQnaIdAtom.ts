import { atom } from 'jotai'
import { pollsRecordAtom } from './pollsRecordAtom'

export const pollIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const pollsRecord = get(pollsRecordAtom)
    return Object.values(pollsRecord)
      .filter((poll) => poll.qnaId === qnaId)
      .map((poll) => poll.id)
  })
