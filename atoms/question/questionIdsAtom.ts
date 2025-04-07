import { atom } from 'jotai'
import { questionsRecordAtom } from './questionsRecordAtom'

export const questionIdsAtom = atom<string[]>((get) =>
  Object.keys(get(questionsRecordAtom)),
)
