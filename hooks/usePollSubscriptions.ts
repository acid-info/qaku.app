import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { PollOptionType, PollType } from '@/types/qna.types'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { pollsRecordAtom } from '../atoms/pollAtom'
import { pollOptionsRecordAtom } from '../atoms/pollOptionAtom'

// Hook for managing poll-specific subscriptions and data loading
export const usePollSubscriptions = (pollId: number) => {
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)
  const setPollsRecord = useSetAtom(pollsRecordAtom)

  useEffect(() => {
    // Load poll-specific data
    const loadPollData = async () => {
      try {
        // Load poll data
        const pollResponse = await apiConnector.getPoll(pollId)
        if (pollResponse.success && pollResponse.data) {
          setPollsRecord((prev) => ({
            ...prev,
            [pollId]: pollResponse.data as PollType,
          }))
        }

        // Load poll options for this poll
        const optionsResponse = await apiConnector.getPollOptionsByPollId(
          pollId,
        )
        if (optionsResponse.success && optionsResponse.data) {
          setPollOptionsRecord((prev) => ({
            ...prev,
            ...optionsResponse.data,
          }))
        }
      } catch (error) {
        console.error(`Error loading data for poll ${pollId}:`, error)
      }
    }

    loadPollData()

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
