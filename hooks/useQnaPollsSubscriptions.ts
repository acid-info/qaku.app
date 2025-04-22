import { apiConnector } from '@/lib/api/connector'
import { PollType } from '@/types/qna.types'
import { loadPollsByQnaId } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { QakuEvents } from 'qakulib'
import { useEffect, useRef } from 'react'
import { pollsRecordAtom } from '../atoms/poll'
import { pollOptionsRecordAtom } from '../atoms/pollOption'

// Hook for managing polls-specific subscriptions and data loading for polls
export const useQnaPollsSubscriptions = (qnaId: string) => {
  const setPollsRecord = useSetAtom(pollsRecordAtom)
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!qnaId) return

    const pollSub = async () => {
      loadPollsByQnaId({ qnaId, setPollsRecord })

      const pollCreateSub = await apiConnector.subscribe<PollType>(
        QakuEvents.NEW_POLL,
        (id, poll) => {
          if (id === qnaId) {
            setPollsRecord((prev: Record<string, PollType>) => ({
              ...prev,
              [poll.id]: poll,
            }))
          }
        },
        { qnaId },
      )

      const pollActiveSub = await apiConnector.subscribe<PollType>(
        QakuEvents.POLL_STATE_CHANGE,
        (id, poll) => {
          if (id === qnaId) {
            setPollsRecord((prev: Record<string, PollType>) => ({
              ...prev,
              [poll.id]: poll,
            }))
          }
        },
        { qnaId },
      )

      return () => {
        pollCreateSub()
        pollActiveSub()
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
  }, [qnaId, setPollsRecord, setPollOptionsRecord])
}
