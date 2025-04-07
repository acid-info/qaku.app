import { atom } from 'jotai'
import { pollsRecordAtom } from './pollsRecordAtom'

export const getPollByIdAtom = (id: string) =>
  atom((get) => get(pollsRecordAtom)[id])
