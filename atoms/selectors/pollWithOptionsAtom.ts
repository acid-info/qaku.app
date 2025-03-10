import { atom } from 'jotai'
import { getPollByIdAtom } from '../poll/getPollByIdAtom'
import { pollOptionIdsByPollIdAtom } from '../pollOption/pollOptionIdsByPollIdAtom'
import { pollOptionsRecordAtom } from '../pollOption/pollOptionsRecordAtom'
import { PollWithOptionsType } from './types'

export const pollWithOptionsAtom = (pollId: number) =>
  atom<PollWithOptionsType | undefined>((get) => {
    const poll = get(getPollByIdAtom(pollId))
    if (!poll) return undefined

    const optionIds = get(pollOptionIdsByPollIdAtom(pollId))
    const optionsRecord = get(pollOptionsRecordAtom)

    const options = optionIds.map((id) => optionsRecord[id])

    return {
      ...poll,
      options,
    }
  })
