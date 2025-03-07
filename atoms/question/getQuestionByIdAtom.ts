import { atom } from 'jotai'
import { questionsRecordAtom } from './questionsRecordAtom'

export const getQuestionByIdAtom = (id: number) =>
  atom((get) => get(questionsRecordAtom)[id])
