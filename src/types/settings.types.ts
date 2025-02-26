export type SaveHandler<T> = (values: T) => void | Promise<void>

export enum ResultVisibility {
  Visible = 'visible',
  Hidden = 'hidden',
}

export interface QnaSettings {
  allowReplies: boolean
  title: string
  showDescription: boolean
  description: string
}

export interface PollSettings {
  multipleOptions: boolean
  markCorrectAnswer: boolean
  resultVisibility: ResultVisibility
  title: string
  showDescription: boolean
  description: string
}

export interface BaseFloatingPanelProps {
  isOpen: boolean
  onClose: () => void
}
