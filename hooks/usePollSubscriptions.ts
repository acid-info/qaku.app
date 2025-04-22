import { apiConnector } from '@/lib/api/connector'
import { PollOptionType } from '@/types/qna.types'
import { loadPollOptions } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { QakuEvents } from 'qakulib'
import { useEffect, useRef } from 'react'
import { pollOptionsRecordAtom } from '../atoms/pollOption'

// Hook for managing poll-specific subscriptions and data loading
export const usePollSubscriptions = (qnaId: string, pollId: string) => {
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!pollId) return

    const pollSub = async () => {
      loadPollOptions({ qnaId, pollId, setPollOptionsRecord })

      // Set up poll-specific subscriptions
      const pollVoteSub = await apiConnector.subscribe<
        Record<string, PollOptionType>
      >(
        QakuEvents.NEW_POLL_VOTE,
        (id, data) => {
          console.log(data)
          const pollOption = data['0'] //FIXME
          console.log('Poll sub', pollOption)
          if (pollOption && pollOption.pollId === pollId) {
            setPollOptionsRecord(data)
          }
        },
        { pollId },
      )
      return () => {
        pollVoteSub()
      }
    }

    pollSub().then((cleanup) => {
      cleanupRef.current = cleanup
    })
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [pollId, setPollOptionsRecord])
}
