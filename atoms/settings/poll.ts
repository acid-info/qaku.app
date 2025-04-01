import {
  PollSettingsInterface,
  ResultVisibilityEnum,
} from '@/types/settings.types'
import { atom } from 'jotai'

export const defaultPollSettings: PollSettingsInterface = {
  multipleOptions: false,
  markCorrectAnswer: false,
  resultVisibility: ResultVisibilityEnum.Visible,
  title: 'New poll',
  showDescription: false,
  description: '',
}

export const pollSettingsAtom = atom<PollSettingsInterface>(defaultPollSettings)
