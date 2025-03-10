import { atom } from 'jotai'
import { questionsRecordAtom } from './questionsRecordAtom'

export const questionIdsAtom = atom<number[]>((get) =>
  Object.keys(get(questionsRecordAtom)).map((id) => parseInt(id)),
)
