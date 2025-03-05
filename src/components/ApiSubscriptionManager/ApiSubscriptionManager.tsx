import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { PollOptionType, PollType } from '@/types/qna.types'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { pollsRecordAtom } from '../../../atoms/pollAtom'
import { pollOptionsRecordAtom } from '../../../atoms/pollOptionAtom'
import { qnasRecordAtom } from '../../../atoms/qnaAtom'

export const ApiSubscriptionManager = () => {
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const setPollsRecord = useSetAtom(pollsRecordAtom)
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  // Todo don't initialize data here. Initialize in Sidebar container the qna and polls,
  // Todo init/subscribe to the rest in the QnaLive and PollLive containers and User pages related containers. (cf subs bellow)
  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load QnAs first
        const qnasResponse = await apiConnector.getQnAs()
        if (qnasResponse.success && qnasResponse.data) {
          setQnasRecord(qnasResponse.data)
        } else if (!qnasResponse.success) {
          console.error('Error loading QnAs:', qnasResponse.error)
          return
        }

        // Load polls
        const pollsResponse = await apiConnector.getPolls()
        if (pollsResponse.success && pollsResponse.data) {
          setPollsRecord(pollsResponse.data)
        } else if (!pollsResponse.success) {
          console.error('Error loading polls:', pollsResponse.error)
          return
        }
      } catch (err) {
        console.error('Error loading initial data:', err)
      }
    }

    loadInitialData()
  }, [setQnasRecord, setPollsRecord])

  // Set up global subscriptions
  useEffect(() => {
    const pollCreateSub = apiConnector.subscribe<PollType>(
      ApiMessageType.POLL_CREATE_MESSAGE,
      (poll) => {
        setPollsRecord((prev: Record<number, PollType>) => ({
          ...prev,
          [poll.id]: poll,
        }))
      },
    )

    const pollVoteSub = apiConnector.subscribe<PollOptionType>(
      ApiMessageType.POLL_VOTE_MESSAGE,
      (option) => {
        setPollOptionsRecord((prev: Record<number, PollOptionType>) => ({
          ...prev,
          [option.id]: option,
        }))
      },
    )

    const pollActiveSub = apiConnector.subscribe<PollType>(
      ApiMessageType.POLL_ACTIVE_MESSAGE,
      (poll) => {
        setPollsRecord((prev: Record<number, PollType>) => ({
          ...prev,
          [poll.id]: poll,
        }))
      },
    )

    return () => {
      pollCreateSub()
      pollVoteSub()
      pollActiveSub()
    }
  }, [setPollsRecord, setPollOptionsRecord])

  return null
}
