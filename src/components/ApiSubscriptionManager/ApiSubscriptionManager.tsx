import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import {
  AnswerType,
  PollOptionType,
  PollType,
  QuestionType,
} from '@/types/qna.types'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { answersRecordAtom } from '../../../atoms/answerAtom'
import { pollsRecordAtom } from '../../../atoms/pollAtom'
import { pollOptionsRecordAtom } from '../../../atoms/pollOptionAtom'
import { qnasRecordAtom } from '../../../atoms/qnaAtom'
import { questionsRecordAtom } from '../../../atoms/questionAtom'

export const ApiSubscriptionManager = () => {
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)
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

        // Load questions
        const questionsResponse = await apiConnector.getQuestions()
        if (questionsResponse.success && questionsResponse.data) {
          setQuestionsRecord(questionsResponse.data)
        } else if (!questionsResponse.success) {
          console.error('Error loading questions:', questionsResponse.error)
          return
        }

        // Load answers
        const answersResponse = await apiConnector.getAnswers()
        if (answersResponse.success && answersResponse.data) {
          setAnswersRecord(answersResponse.data)
        } else if (!answersResponse.success) {
          console.error('Error loading answers:', answersResponse.error)
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

        // Load poll options
        const pollOptionsResponse = await apiConnector.getPollOptions()
        if (pollOptionsResponse.success && pollOptionsResponse.data) {
          setPollOptionsRecord(pollOptionsResponse.data)
        } else if (!pollOptionsResponse.success) {
          console.error(
            'Error loading poll options:',
            pollOptionsResponse.error,
          )
          return
        }
      } catch (err) {
        console.error('Error loading initial data:', err)
      }
    }

    loadInitialData()
  }, [
    setQuestionsRecord,
    setAnswersRecord,
    setQnasRecord,
    setPollsRecord,
    setPollOptionsRecord,
  ])

  // Set up global subscriptions
  useEffect(() => {
    const questionSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.QUESTION_MESSAGE,
      (question) => {
        setQuestionsRecord((prev: Record<number, QuestionType>) => ({
          ...prev,
          [question.id]: question,
        }))
      },
    )

    const answerSub = apiConnector.subscribe<AnswerType>(
      ApiMessageType.ANSWER_MESSAGE,
      (answer) => {
        setAnswersRecord((prev: Record<number, AnswerType>) => ({
          ...prev,
          [answer.id]: answer,
        }))
      },
    )

    const upvoteSub = apiConnector.subscribe<QuestionType | AnswerType>(
      ApiMessageType.UPVOTE_MESSAGE,
      (data) => {
        // Check if it's a question or answer
        if ('questionId' in data) {
          // It's an answer
          setAnswersRecord((prev: Record<number, AnswerType>) => ({
            ...prev,
            [data.id]: data as AnswerType,
          }))
        } else {
          // It's a question
          setQuestionsRecord((prev: Record<number, QuestionType>) => ({
            ...prev,
            [data.id]: data as QuestionType,
          }))
        }
      },
    )

    const answeredSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.ANSWERED_MESSAGE,
      (question) => {
        setQuestionsRecord((prev: Record<number, QuestionType>) => ({
          ...prev,
          [question.id]: question,
        }))
      },
    )

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
      questionSub()
      answerSub()
      upvoteSub()
      answeredSub()
      pollCreateSub()
      pollVoteSub()
      pollActiveSub()
    }
  }, [
    setQuestionsRecord,
    setAnswersRecord,
    setPollsRecord,
    setPollOptionsRecord,
  ])

  return null
}
