import { atom } from 'jotai'
import { pollOptionsRecordAtom } from './pollOptionsRecordAtom'

export const pollOptionIdsAtom = atom<number[]>((get) =>
  Object.keys(get(pollOptionsRecordAtom)).map((id) => parseInt(id)),
)
