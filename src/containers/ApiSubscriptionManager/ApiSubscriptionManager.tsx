import { answersRecordAtom } from '@/../atoms/answer'
import { pollsRecordAtom } from '@/../atoms/poll'
import { pollOptionsRecordAtom } from '@/../atoms/pollOption'
import { qnasRecordAtom } from '@/../atoms/qna'
import { questionsRecordAtom } from '@/../atoms/question'
import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { PollType, QnAType } from '@/types/qna.types'
import {
  handlePollDeleteInState,
  handlePollUpdateInState,
} from '@/utils/poll.utils'
import {
  handleQnADeleteInState,
  handleQnAUpdateInState,
} from '@/utils/qna.utils'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const ApiSubscriptionManager = () => {
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const setPollsRecord = useSetAtom(pollsRecordAtom)
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

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
    const qnaUpdateSub = apiConnector.subscribe<QnAType>(
      ApiMessageType.QNA_UPDATE_MESSAGE,
      (qna) => {
        handleQnAUpdateInState({ qna, setQnasRecord })
      },
    )

    const qnaDeleteSub = apiConnector.subscribe<{ qnaId: string }>(
      ApiMessageType.QNA_DELETE_MESSAGE,
      ({ qnaId }) => {
        handleQnADeleteInState({
          qnaId,
          setQnasRecord,
          setQuestionsRecord,
          setAnswersRecord,
        })
      },
    )

    const pollUpdateSub = apiConnector.subscribe<PollType>(
      ApiMessageType.POLL_UPDATE_MESSAGE,
      (poll) => {
        handlePollUpdateInState({ poll, setPollsRecord })
      },
    )

    const pollCreateSub = apiConnector.subscribe<PollType>(
      ApiMessageType.POLL_CREATE_MESSAGE,
      (poll) => {
        handlePollUpdateInState({ poll, setPollsRecord })
      },
    )

    const pollDeleteSub = apiConnector.subscribe<{ pollId: string }>(
      ApiMessageType.POLL_DELETE_MESSAGE,
      ({ pollId }) => {
        handlePollDeleteInState({
          pollId,
          setPollsRecord,
          setPollOptionsRecord,
        })
      },
    )

    return () => {
      qnaUpdateSub()
      qnaDeleteSub()
      pollUpdateSub()
      pollCreateSub()
      pollDeleteSub()
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
