import { atom } from 'jotai'
import { pollOptionsRecordAtom } from './pollOptionsRecordAtom'

export const getPollOptionByIdAtom = (id: number) =>
  atom((get) => get(pollOptionsRecordAtom)[id])
