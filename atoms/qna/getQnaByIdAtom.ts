import { atom } from 'jotai'
import { qnasRecordAtom } from './qnasRecordAtom'

export const getQnaByIdAtom = (id: string) =>
  atom((get) => get(qnasRecordAtom)[id])
