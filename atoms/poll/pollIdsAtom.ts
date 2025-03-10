import { atom } from 'jotai'
import { pollsRecordAtom } from './pollsRecordAtom'

export const pollIdsAtom = atom<number[]>((get) =>
  Object.keys(get(pollsRecordAtom)).map((id) => parseInt(id)),
)
