import { answersRecordAtom } from '@/../atoms/answer'
import { pollsRecordAtom } from '@/../atoms/poll'
import { pollOptionsRecordAtom } from '@/../atoms/pollOption'
import { qnasRecordAtom } from '@/../atoms/qna'
import { questionsRecordAtom } from '@/../atoms/question'
import { apiConnector } from '@/lib/api/connector'
import { PollType, QnAType } from '@/types/qna.types'
import { handlePollUpdateInState } from '@/utils/poll.utils'
import { handleQnAUpdateInState } from '@/utils/qna.utils'
import { useSetAtom } from 'jotai'
import { QakuEvents } from 'qakulib'
import { useEffect, useRef } from 'react'

export const ApiSubscriptionManager = () => {
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const setPollsRecord = useSetAtom(pollsRecordAtom)
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  const cleanupRef = useRef<(() => void) | null>(null)

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load QnAs first
        // TODO-vaclav trigger global loading state?
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
  // TODO-vaclav
  // In this useEffect subscribe to general events
  // (qna active state change, qna title change, qna creation, qna deletion,
  // eventually the same events for polls)
  // TODO-vaclav-end
  useEffect(() => {
    const qnaSub = async () => {
      const qnaUpdateSub = await apiConnector.subscribe<QnAType>(
        QakuEvents.QAKU_CONTENT_CHANGED,
        (id, qna) => {
          handleQnAUpdateInState({ qna, setQnasRecord })
        },
      )

      const pollUpdateSub = await apiConnector.subscribe<PollType>(
        QakuEvents.NEW_POLL_VOTE,
        (id, poll) => {
          handlePollUpdateInState({ poll, setPollsRecord })
        },
      )

      const pollCreateSub = await apiConnector.subscribe<PollType>(
        QakuEvents.NEW_POLL,
        (id, poll) => {
          handlePollUpdateInState({ poll, setPollsRecord })
        },
      )

      return () => {
        qnaUpdateSub()
        pollUpdateSub()
        pollCreateSub()
      }
    }

    qnaSub().then((cleanup) => {
      cleanupRef.current = cleanup
    })

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [
    setQnasRecord,
    setPollsRecord,
    setPollOptionsRecord,
    setQuestionsRecord,
    setAnswersRecord,
  ])

  return null
}
