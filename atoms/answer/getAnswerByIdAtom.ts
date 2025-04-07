import { atom } from 'jotai'
import { answersRecordAtom } from './answersRecordAtom'

export const getAnswerByIdAtom = (id: string) =>
  atom((get) => get(answersRecordAtom)[id])
