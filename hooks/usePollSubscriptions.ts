import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { PollOptionType } from '@/types/qna.types'
import { loadPollOptions } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { pollOptionsRecordAtom } from '../atoms/pollOption'

// Hook for managing poll-specific subscriptions and data loading
export const usePollSubscriptions = (pollId: string) => {
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  useEffect(() => {
    if (!pollId) return

    loadPollOptions({ pollId, setPollOptionsRecord })

    // Set up poll-specific subscriptions
    const pollVoteSub = apiConnector.subscribe<PollOptionType>(
      ApiMessageType.POLL_VOTE_MESSAGE,
      (option) => {
        if (option.pollId === pollId) {
          setPollOptionsRecord((prev: Record<string, PollOptionType>) => ({
            ...prev,
            [option.id]: option,
          }))
        }
      },
      { pollId },
    )

    return () => {
      pollVoteSub()
    }
  }, [pollId, setPollOptionsRecord])
}
