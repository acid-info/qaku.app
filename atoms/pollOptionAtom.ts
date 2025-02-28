import { mockPollOptions } from '@/data/mockPollOptions'
import { PollOptionType } from '@/types/qna.types'
import {
  calculateOptionPercentage,
  calculateTotalVotes,
} from '@/utils/poll.utils'
import { atom } from 'jotai'

export const pollOptionsRecordAtom = atom<Record<number, PollOptionType>>(
  mockPollOptions.reduce((acc, option) => {
    acc[option.id] = option
    return acc
  }, {} as Record<number, PollOptionType>),
)

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

export const pollOptionStatsByPollIdAtom = (pollId: number) =>
  atom((get) => {
    const pollOptionsRecord = get(pollOptionsRecordAtom)
    const optionIds = get(pollOptionIdsByPollIdAtom(pollId))

    const pollOptions = optionIds.map((id) => pollOptionsRecord[id])

    const totalVotes = calculateTotalVotes(pollOptions)

    const optionVotes = optionIds.reduce((acc, id) => {
      acc[id] = pollOptionsRecord[id].voteCount
      return acc
    }, {} as Record<number, number>)

    const optionPercentages = optionIds.reduce((acc, id) => {
      acc[id] = calculateOptionPercentage(pollOptionsRecord[id], totalVotes)
      return acc
    }, {} as Record<number, number>)

    return {
      totalVotes,
      optionVotes,
      optionPercentages,
    }
  })
