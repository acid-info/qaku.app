import { PollType } from '@/types/qna.types'
import { atom } from 'jotai'

export const pollsRecordAtom = atom<Record<number, PollType>>({})
