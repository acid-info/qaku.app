import { atom } from 'jotai'
import { qnasRecordAtom } from './qnasRecordAtom'

export const getQnaByIdAtom = (id: number) =>
  atom((get) => get(qnasRecordAtom)[id])
