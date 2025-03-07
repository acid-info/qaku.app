import { atom } from 'jotai'
import { answersRecordAtom } from './answersRecordAtom'

export const getAnswerByIdAtom = (id: number) =>
  atom((get) => get(answersRecordAtom)[id])
