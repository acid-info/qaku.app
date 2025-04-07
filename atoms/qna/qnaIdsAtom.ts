import { atom } from 'jotai'
import { qnasRecordAtom } from './qnasRecordAtom'

export const qnaIdsAtom = atom<string[]>((get) =>
  Object.keys(get(qnasRecordAtom)),
)
