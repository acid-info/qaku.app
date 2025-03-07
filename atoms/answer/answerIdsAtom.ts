import { atom } from 'jotai'
import { answersRecordAtom } from './answersRecordAtom'

export const answerIdsAtom = atom<number[]>((get) =>
  Object.keys(get(answersRecordAtom)).map((id) => parseInt(id)),
)
