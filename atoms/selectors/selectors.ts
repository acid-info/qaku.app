import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'
import { calculateTotalVotes } from '@/utils/poll.utils'
import { calculateQnAStats } from '@/utils/qna.utils'
import { atom } from 'jotai'
import {
  answerIdsByQnaIdAtom,
  answerIdsByQuestionIdAtom,
  answersRecordAtom,
} from '../answerAtom'
import { getPollByIdAtom } from '../pollAtom'
import {
  pollOptionIdsByPollIdAtom,
  pollOptionsRecordAtom,
} from '../pollOptionAtom'
import { getQnaByIdAtom } from '../qnaAtom'
import {
  getQuestionByIdAtom,
  questionIdsByQnaIdAtom,
  questionsRecordAtom,
} from '../questionAtom'

// Type definitions for composed data
export type QnAWithQuestionsType = QnAType & {
  questions: QuestionType[]
}

export type QuestionWithAnswersType = QuestionType & {
  answers: AnswerType[]
}

export type PollWithOptionsType = PollType & {
  options: PollOptionType[]
}

export type CompleteQnAType = QnAType & {
  questions: (QuestionType & {
    answers: AnswerType[]
  })[]
  polls: (PollType & {
    options: PollOptionType[]
  })[]
}

export const pollWithOptionsAtom = (pollId: number) =>
  atom<PollWithOptionsType | undefined>((get) => {
    const poll = get(getPollByIdAtom(pollId))
    if (!poll) return undefined

    const optionIds = get(pollOptionIdsByPollIdAtom(pollId))
    const optionsRecord = get(pollOptionsRecordAtom)

    const options = optionIds.map((id) => optionsRecord[id])

    return {
      ...poll,
      options,
    }
  })

export const allQuestionsWithAnswersForQnAAtom = (qnaId: number) =>
  atom((get) => {
    const questionIds = get(questionIdsByQnaIdAtom(qnaId))
    const questionsRecord = get(questionsRecordAtom)
    const answersRecord = get(answersRecordAtom)

    return questionIds.map((questionId) => {
      const question = questionsRecord[questionId]
      const answerIds = get(answerIdsByQuestionIdAtom(questionId))
      const answers = answerIds.map((id) => answersRecord[id])

      return {
        ...question,
        answers,
      }
    })
  })

export const qnaCountsByIdAtom = (id: number) =>
  atom((get) => {
    const qna = get(getQnaByIdAtom(id))
    if (!qna) return undefined

    const questions = qna.questionsIds.map((id) => get(getQuestionByIdAtom(id)))
    const answerIds = get(answerIdsByQnaIdAtom(id))
    const answersRecord = get(answersRecordAtom)
    const answers = answerIds.map((id) => answersRecord[id])

    return calculateQnAStats(questions, answers)
  })

export const getPollTotalVotesCountAtom = (pollId: number) =>
  atom((get) => {
    const optionIds = get(pollOptionIdsByPollIdAtom(pollId))
    const optionsRecord = get(pollOptionsRecordAtom)
    const options = optionIds.map((id) => optionsRecord[id])

    return calculateTotalVotes(options)
  })
