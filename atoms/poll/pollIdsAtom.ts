import { atom } from 'jotai'
import { pollsRecordAtom } from './pollsRecordAtom'

export const pollIdsAtom = atom<string[]>((get) =>
  Object.keys(get(pollsRecordAtom)),
)
