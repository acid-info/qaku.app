import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { PollType } from '@/types/qna.types'
import { loadPollsByQnaId } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { pollsRecordAtom } from '../atoms/poll'
import { pollOptionsRecordAtom } from '../atoms/pollOption'

// Hook for managing polls-specific subscriptions and data loading for polls
export const useQnaPollsSubscriptions = (qnaId: number) => {
  const setPollsRecord = useSetAtom(pollsRecordAtom)
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  useEffect(() => {
    loadPollsByQnaId({ qnaId, setPollsRecord })

    const pollCreateSub = apiConnector.subscribe<PollType>(
      ApiMessageType.POLL_CREATE_MESSAGE,
      (poll) => {
        if (poll.qnaId === qnaId) {
          setPollsRecord((prev: Record<number, PollType>) => ({
            ...prev,
            [poll.id]: poll,
          }))
        }
      },
      { qnaId },
    )

    const pollActiveSub = apiConnector.subscribe<PollType>(
      ApiMessageType.POLL_ACTIVE_MESSAGE,
      (poll) => {
        if (poll.qnaId === qnaId) {
          setPollsRecord((prev: Record<number, PollType>) => ({
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
  }, [qnaId, setPollsRecord, setPollOptionsRecord])
}
