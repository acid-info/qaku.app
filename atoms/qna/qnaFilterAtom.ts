import { QnAFilterTypeEnum } from '@/types/qna.types'
import { atom } from 'jotai'

export const qnaFilterAtom = atom<QnAFilterTypeEnum>(QnAFilterTypeEnum.All)
