import { atom } from 'jotai'
import { pollsRecordAtom } from './pollsRecordAtom'

export const pollIdsByQnaIdAtom = (qnaId: string) =>
  atom<string[]>((get) => {
    const polls = get(pollsRecordAtom)
    return Object.values(polls)
      .filter((poll) => poll.qnaId === qnaId)
      .map((poll) => poll.id)
  })
