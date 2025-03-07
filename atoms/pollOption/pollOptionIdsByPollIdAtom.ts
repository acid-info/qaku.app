import { atom } from 'jotai'
import { pollOptionsRecordAtom } from './pollOptionsRecordAtom'

export const pollOptionIdsByPollIdAtom = (pollId: number) =>
  atom<number[]>((get) => {
    const pollOptionsRecord = get(pollOptionsRecordAtom)
    return Object.values(pollOptionsRecord)
      .filter((option) => option.pollId === pollId)
      .map((option) => option.id)
  })
