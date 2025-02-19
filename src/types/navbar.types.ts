export type NavbarMode = 'qna' | 'polls'

export enum QnaProgressStatus {
  BeforeStart = 'beforeStart',
  InProgress = 'inProgress',
  Ended = 'ended',
}

export interface BaseNavbarProps {
  mode: NavbarMode
  title: string
  count: number
  id: string
}

export interface DefaultNavbarProps extends BaseNavbarProps {
  isTitleOnly?: boolean
  date: string
  status?: QnaProgressStatus
  onSettingsClick?: () => void
}

export interface UserNavbarProps extends BaseNavbarProps {
  onModeChange?: (mode: NavbarMode) => void
}
