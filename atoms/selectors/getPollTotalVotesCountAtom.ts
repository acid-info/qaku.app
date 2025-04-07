import { calculateTotalVotes } from '@/utils/poll.utils'
import { atom } from 'jotai'
import { pollOptionIdsByPollIdAtom } from '../pollOption/pollOptionIdsByPollIdAtom'
import { pollOptionsRecordAtom } from '../pollOption/pollOptionsRecordAtom'

export const getPollTotalVotesCountAtom = (pollId: string) =>
  atom((get) => {
    const optionIds = get(pollOptionIdsByPollIdAtom(pollId))
    const optionsRecord = get(pollOptionsRecordAtom)
    const options = optionIds.map((id) => optionsRecord[id])

    return calculateTotalVotes(options)
  })
