import { atom } from 'jotai'
import { answersRecordAtom } from './answersRecordAtom'

export const answerIdsByQuestionIdAtom = (questionId: number) =>
  atom<number[]>((get) => {
    const answersRecord = get(answersRecordAtom)
    return Object.values(answersRecord)
      .filter((answer) => answer.questionId === questionId)
      .map((answer) => answer.id)
  })
