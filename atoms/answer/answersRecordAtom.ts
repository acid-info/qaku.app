import { AnswerType } from '@/types/qna.types'
import { atom } from 'jotai'

export const answersRecordAtom = atom<Record<number, AnswerType>>({})
