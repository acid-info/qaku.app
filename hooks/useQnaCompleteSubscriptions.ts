import { apiConnector } from '@/lib/api/connector'
import { ApiMessageType } from '@/lib/api/types'
import { AnswerType, PollType, QuestionType } from '@/types/qna.types'
import { loadPollOptions, loadQnaData } from '@/utils/api.utils'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { answersRecordAtom } from '../atoms/answerAtom'
import { pollsRecordAtom } from '../atoms/pollAtom'
import { pollOptionsRecordAtom } from '../atoms/pollOptionAtom'
import { questionsRecordAtom } from '../atoms/questionAtom'

// Hook for managing all QnA-specific subscriptions and data loading
export const useQnaCompleteSubscriptions = (qnaId: number) => {
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)
  const setPollsRecord = useSetAtom(pollsRecordAtom)
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  useEffect(() => {
    const loadAllQnaData = async () => {
      try {
        await loadQnaData({ qnaId, setQuestionsRecord, setAnswersRecord })

        // Load polls for this QnA
        const pollsResponse = await apiConnector.getPollsByQnaId(qnaId)
        if (pollsResponse.success && pollsResponse.data) {
          setPollsRecord((prev) => ({
            ...prev,
            ...pollsResponse.data,
          }))

          const pollIds = Object.keys(pollsResponse.data).map(Number)
          for (const pollId of pollIds) {
            await loadPollOptions({ pollId, setPollOptionsRecord })
          }
        }
      } catch (error) {
        console.error(`Error loading data for QnA ${qnaId}:`, error)
      }
    }

    loadAllQnaData()

    const questionSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.QUESTION_MESSAGE,
      (question) => {
        if (question.qnaId === qnaId) {
          setQuestionsRecord((prev: Record<number, QuestionType>) => ({
            ...prev,
            [question.id]: question,
          }))
        }
      },
      { qnaId },
    )

    const answerSub = apiConnector.subscribe<AnswerType>(
      ApiMessageType.ANSWER_MESSAGE,
      (answer) => {
        if (answer.qnaId === qnaId) {
          setAnswersRecord((prev: Record<number, AnswerType>) => ({
            ...prev,
            [answer.id]: answer,
          }))
        }
      },
      { qnaId },
    )

    const upvoteSub = apiConnector.subscribe<QuestionType | AnswerType>(
      ApiMessageType.UPVOTE_MESSAGE,
      (data) => {
        if ('questionId' in data) {
          // It's an answer
          if (data.qnaId === qnaId) {
            setAnswersRecord((prev: Record<number, AnswerType>) => ({
              ...prev,
              [data.id]: data as AnswerType,
            }))
          }
        } else {
          // It's a question
          if (data.qnaId === qnaId) {
            setQuestionsRecord((prev: Record<number, QuestionType>) => ({
              ...prev,
              [data.id]: data as QuestionType,
            }))
          }
        }
      },
      { qnaId },
    )

    const answeredSub = apiConnector.subscribe<QuestionType>(
      ApiMessageType.ANSWERED_MESSAGE,
      (question) => {
        if (question.qnaId === qnaId) {
          setQuestionsRecord((prev: Record<number, QuestionType>) => ({
            ...prev,
            [question.id]: question,
          }))
        }
      },
      { qnaId },
    )

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
      questionSub()
      answerSub()
      upvoteSub()
      answeredSub()
      pollCreateSub()
      pollActiveSub()
    }
  }, [
    qnaId,
    setQuestionsRecord,
    setAnswersRecord,
    setPollsRecord,
    setPollOptionsRecord,
  ])
}
