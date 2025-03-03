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
import {
  getPollByIdAtom,
  pollIdsByQnaIdAtom,
  pollsRecordAtom,
} from '../pollAtom'
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

export const qnaWithQuestionsAtom = (qnaId: number) =>
  atom<QnAWithQuestionsType | undefined>((get) => {
    const qna = get(getQnaByIdAtom(qnaId))
    if (!qna) return undefined

    const questionIds = get(questionIdsByQnaIdAtom(qnaId))
    const questionsRecord = get(questionsRecordAtom)

    const questions = questionIds.map((id) => questionsRecord[id])

    return {
      ...qna,
      questions,
    }
  })

export const questionWithAnswersAtom = (questionId: number) =>
  atom<QuestionWithAnswersType | undefined>((get) => {
    const question = get(getQuestionByIdAtom(questionId))
    if (!question) return undefined

    const answerIds = get(answerIdsByQuestionIdAtom(questionId))
    const answersRecord = get(answersRecordAtom)

    const answers = answerIds.map((id) => answersRecord[id])

    return {
      ...question,
      answers,
    }
  })

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

// Selector atom for getting a complete QnA with all related data
export const completeQnAAtom = (qnaId: number) =>
  atom<CompleteQnAType | undefined>((get) => {
    const qna = get(getQnaByIdAtom(qnaId))
    if (!qna) return undefined

    // Get questions with answers
    const questionIds = get(questionIdsByQnaIdAtom(qnaId))
    const questionsRecord = get(questionsRecordAtom)
    const answersRecord = get(answersRecordAtom)

    const questions = questionIds.map((questionId) => {
      const question = questionsRecord[questionId]
      const answerIds = get(answerIdsByQuestionIdAtom(questionId))
      const answers = answerIds.map((id) => answersRecord[id])

      return {
        ...question,
        answers,
      }
    })

    // Get polls with options
    const pollIds = get(pollIdsByQnaIdAtom(qnaId))
    const pollsRecord = get(pollsRecordAtom)
    const optionsRecord = get(pollOptionsRecordAtom)

    const polls = pollIds.map((pollId) => {
      const poll = pollsRecord[pollId]
      const optionIds = get(pollOptionIdsByPollIdAtom(pollId))
      const options = optionIds.map((id) => optionsRecord[id])

      return {
        ...poll,
        options,
      }
    })

    return {
      ...qna,
      questions,
      polls,
    }
  })

export const allAnswersForQnAAtom = (qnaId: number) =>
  atom((get) => {
    const answerIds = get(answerIdsByQnaIdAtom(qnaId))
    const answersRecord = get(answersRecordAtom)

    return answerIds.map((id) => answersRecord[id])
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

export const allPollsWithOptionsForQnAAtom = (qnaId: number) =>
  atom((get) => {
    const pollIds = get(pollIdsByQnaIdAtom(qnaId))
    const pollsRecord = get(pollsRecordAtom)
    const optionsRecord = get(pollOptionsRecordAtom)

    return pollIds.map((pollId) => {
      const poll = pollsRecord[pollId]
      const optionIds = get(pollOptionIdsByPollIdAtom(pollId))
      const options = optionIds.map((id) => optionsRecord[id])

      return {
        ...poll,
        options,
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

// todo remove this "backend" logic and use fake backend logic + connector to mimic prod
export const questionLikeAtom = atom(
  null,
  (
    get,
    set,
    { questionId, userId }: { questionId: number; userId: string },
  ) => {
    const questionsRecord = get(questionsRecordAtom)
    const question = questionsRecord[questionId]
    if (!question) return

    const updatedQuestion = {
      ...question,
      likesCount: question.likers.includes(userId)
        ? question.likesCount - 1
        : question.likesCount + 1,
      likers: question.likers.includes(userId)
        ? question.likers.filter((id) => id !== userId)
        : [...question.likers, userId],
    }

    set(questionsRecordAtom, {
      ...questionsRecord,
      [questionId]: updatedQuestion,
    })
  },
)

export const answerLikeAtom = atom(
  null,
  (get, set, { answerId, userId }: { answerId: number; userId: string }) => {
    const answersRecord = get(answersRecordAtom)
    const answer = answersRecord[answerId]
    if (!answer) return

    const updatedAnswer = {
      ...answer,
      likesCount: answer.likers.includes(userId)
        ? answer.likesCount - 1
        : answer.likesCount + 1,
      likers: answer.likers.includes(userId)
        ? answer.likers.filter((id) => id !== userId)
        : [...answer.likers, userId],
    }

    set(answersRecordAtom, {
      ...answersRecord,
      [answerId]: updatedAnswer,
    })
  },
)

export const addAnswerAtom = atom(
  null,
  (
    get,
    set,
    {
      questionId,
      qnaId,
      content,
      author,
    }: {
      questionId: number
      qnaId: number
      content: string
      author: string
    },
  ) => {
    const answersRecord = get(answersRecordAtom)
    const newId = Math.max(...Object.keys(answersRecord).map(Number)) + 1

    const newAnswer: AnswerType = {
      id: newId,
      questionId,
      qnaId,
      content,
      author,
      timestamp: new Date(),
      likesCount: 0,
      likers: [],
    }

    set(answersRecordAtom, {
      ...answersRecord,
      [newId]: newAnswer,
    })
  },
)

export const toggleAnsweredAtom = atom(null, (get, set, questionId: number) => {
  const questionsRecord = get(questionsRecordAtom)
  const question = questionsRecord[questionId]
  if (!question) return

  set(questionsRecordAtom, {
    ...questionsRecord,
    [questionId]: {
      ...question,
      isAnswered: !question.isAnswered,
    },
  })
})
