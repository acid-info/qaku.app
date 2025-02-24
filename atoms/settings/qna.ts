import { QnaSettings } from '@/components/FloatingPanel/types'
import { atom } from 'jotai'

const defaultQnaSettings: QnaSettings = {
  allowReplies: true,
  title: '',
  showDescription: false,
  description: '',
}

export const qnaSettingsAtom = atom<QnaSettings>(defaultQnaSettings)
