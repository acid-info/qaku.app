import { QnaSettingsInterface } from '@/types/settings.types'
import { atom } from 'jotai'

export const defaultQnaSettings: QnaSettingsInterface = {
  allowsParticipantsReplies: false,
  title: 'New Qaku',
  showDescription: false,
  description: '',
  admins: [],
}

export const qnaSettingsAtom = atom<QnaSettingsInterface>(defaultQnaSettings)
