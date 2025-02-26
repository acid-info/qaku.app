import { QnaSettingsInterface } from '@/types/settings.types'
import { atom } from 'jotai'

const defaultQnaSettings: QnaSettingsInterface = {
  allowReplies: true,
  title: '',
  showDescription: false,
  description: '',
}

export const qnaSettingsAtom = atom<QnaSettingsInterface>(defaultQnaSettings)
