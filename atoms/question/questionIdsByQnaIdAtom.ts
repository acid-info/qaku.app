import { atom } from 'jotai'
import { questionsRecordAtom } from './questionsRecordAtom'

export const questionIdsByQnaIdAtom = (qnaId: string) =>
  atom<string[]>((get) => {
    const questions = get(questionsRecordAtom)
    return Object.values(questions)
      .filter((question) => question.qnaId === qnaId)
      .map((question) => question.id)
  })
