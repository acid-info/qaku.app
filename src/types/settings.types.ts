export type SaveHandlerType<T> = (values: T) => void | Promise<void>

export enum ResultVisibilityEnum {
  Visible = 'visible',
  Hidden = 'hidden',
}

export interface QnaSettingsInterface {
  allowReplies: boolean
  title: string
  showDescription: boolean
  description: string
  coHosts: string[]
}

export type PollSettingsEditValuesType = {
  hasMultipleOptionsSelect: boolean
  hasCorrectAnswers: boolean
  isResultVisible: boolean
  title: string
  showDescription: boolean
  description: string | undefined
}

export interface PollSettingsInterface {
  multipleOptions: boolean
  markCorrectAnswer: boolean
  resultVisibility: ResultVisibilityEnum
  title: string
  showDescription: boolean
  description: string
}

export interface BaseFloatingPanelPropsInterface {
  isOpen: boolean
  onClose: () => void
}
