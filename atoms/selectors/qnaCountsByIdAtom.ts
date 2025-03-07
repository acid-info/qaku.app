import { calculateQnAStats } from '@/utils/qna.utils'
import { atom } from 'jotai'
import { answerIdsByQnaIdAtom } from '../answer/answerIdsByQnaIdAtom'
import { answersRecordAtom } from '../answer/answersRecordAtom'
import { getQnaByIdAtom } from '../qna/getQnaByIdAtom'
import { getQuestionByIdAtom } from '../question/getQuestionByIdAtom'

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
