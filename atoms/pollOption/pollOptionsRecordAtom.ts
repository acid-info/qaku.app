import { PollOptionType } from '@/types/qna.types'
import { atom } from 'jotai'

export const pollOptionsRecordAtom = atom<Record<number, PollOptionType>>({})
