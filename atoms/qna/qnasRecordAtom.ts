import { QnAType } from '@/types/qna.types'
import { atom } from 'jotai'

export const qnasRecordAtom = atom<Record<string, QnAType>>({})
