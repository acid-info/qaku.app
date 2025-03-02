import { mockPolls } from '@/data/mockPolls'
import { PollType } from '@/types/qna.types'
import { atom } from 'jotai'

export const pollsRecordAtom = atom<Record<number, PollType>>(
  mockPolls.reduce((acc, poll) => {
    acc[poll.id] = poll
    return acc
  }, {} as Record<number, PollType>),
)

export const pollIdsAtom = atom<number[]>((get) =>
  Object.keys(get(pollsRecordAtom)).map((id) => parseInt(id)),
)

export const pollIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const pollsRecord = get(pollsRecordAtom)
    return Object.values(pollsRecord)
      .filter((poll) => poll.qnaId === qnaId)
      .map((poll) => poll.id)
  })

export const activePollIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const pollsRecord = get(pollsRecordAtom)
    return Object.values(pollsRecord)
      .filter((poll) => poll.qnaId === qnaId && poll.isActive)
      .map((poll) => poll.id)
  })

export const inactivePollIdsByQnaIdAtom = (qnaId: number) =>
  atom<number[]>((get) => {
    const pollsRecord = get(pollsRecordAtom)
    return Object.values(pollsRecord)
      .filter((poll) => poll.qnaId === qnaId && !poll.isActive)
      .map((poll) => poll.id)
  })

export const getPollByIdAtom = (id: number) =>
  atom((get) => get(pollsRecordAtom)[id])
