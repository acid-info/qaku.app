import { atom } from 'jotai'
import { questionsRecordAtom } from './questionsRecordAtom'

export const getQuestionByIdAtom = (id: string) =>
  atom((get) => get(questionsRecordAtom)[id])
