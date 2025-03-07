import { atom } from 'jotai'
import { pollsRecordAtom } from './pollsRecordAtom'

export const getPollByIdAtom = (id: number) =>
  atom((get) => get(pollsRecordAtom)[id])
