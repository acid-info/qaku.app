import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { PollOptionType, PollType } from '@/types/qna.types'
import { loadPollOptions } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { pollsRecordAtom } from '../atoms/pollAtom'
import { pollOptionsRecordAtom } from '../atoms/pollOptionAtom'

// Hook for managing poll-specific subscriptions and data loading
export const usePollSubscriptions = (pollId: number) => {
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)
  const setPollsRecord = useSetAtom(pollsRecordAtom)

  useEffect(() => {
    loadPollOptions(pollId, setPollOptionsRecord)

    // Set up poll-specific subscriptions
    const pollVoteSub = apiConnector.subscribe<PollOptionType>(
      ApiMessageType.POLL_VOTE_MESSAGE,
      (option) => {
        if (option.pollId === pollId) {
          setPollOptionsRecord((prev: Record<number, PollOptionType>) => ({
            ...prev,
            [option.id]: option,
          }))
        }
      },
      { pollId },
    )

    const pollActiveSub = apiConnector.subscribe<PollType>(
      ApiMessageType.POLL_ACTIVE_MESSAGE,
      (poll) => {
        if (poll.id === pollId) {
          setPollsRecord((prev: Record<number, PollType>) => ({
            ...prev,
            [poll.id]: poll,
          }))
        }
      },
      { pollId },
    )

    return () => {
      pollVoteSub()
      pollActiveSub()
    }
  }, [pollId, setPollOptionsRecord, setPollsRecord])
}
