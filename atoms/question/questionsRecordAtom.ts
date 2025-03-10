import { QuestionType } from '@/types/qna.types'
import { atom } from 'jotai'

export const questionsRecordAtom = atom<Record<number, QuestionType>>({})
