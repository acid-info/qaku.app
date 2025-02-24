import {
  PollSettings,
  ResultVisibility,
} from '@/components/FloatingPanel/types'
import { atom } from 'jotai'

const defaultPollSettings: PollSettings = {
  multipleOptions: true,
  markCorrectAnswer: true,
  resultVisibility: ResultVisibility.Visible,
  title: '',
  showDescription: false,
  description: '',
}

export const pollSettingsAtom = atom<PollSettings>(defaultPollSettings)
