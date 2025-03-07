import { atom } from 'jotai'
import { qnasRecordAtom } from './qnasRecordAtom'

export const qnaIdsAtom = atom<number[]>((get) =>
  Object.keys(get(qnasRecordAtom)).map((id) => parseInt(id)),
)
