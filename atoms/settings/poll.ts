import {
  PollSettingsInterface,
  ResultVisibilityEnum,
} from '@/types/settings.types'
import { atom } from 'jotai'

const defaultPollSettings: PollSettingsInterface = {
  multipleOptions: true,
  markCorrectAnswer: true,
  resultVisibility: ResultVisibilityEnum.Visible,
  title: '',
  showDescription: false,
  description: '',
}

export const pollSettingsAtom = atom<PollSettingsInterface>(defaultPollSettings)
