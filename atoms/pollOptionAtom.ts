import { PollOptionType } from '@/types/qna.types'
import { atom } from 'jotai'

export const pollOptionsRecordAtom = atom<Record<number, PollOptionType>>({})

export const pollOptionIdsAtom = atom<number[]>((get) =>
  Object.keys(get(pollOptionsRecordAtom)).map((id) => parseInt(id)),
)

export const pollOptionIdsByPollIdAtom = (pollId: number) =>
  atom<number[]>((get) => {
    const pollOptionsRecord = get(pollOptionsRecordAtom)
    return Object.values(pollOptionsRecord)
      .filter((option) => option.pollId === pollId)
      .map((option) => option.id)
  })

export const getPollOptionByIdAtom = (id: number) =>
  atom((get) => get(pollOptionsRecordAtom)[id])
