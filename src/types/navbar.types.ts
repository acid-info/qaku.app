export enum NavbarModeEnum {
  Qna = 'qna',
  Polls = 'polls',
}

export enum QnaProgressStatusEnum {
  BeforeStart = 'beforeStart',
  InProgress = 'inProgress',
  Ended = 'ended',
}

export interface BaseNavbarProps {
  mode: NavbarModeEnum
  title: string
  count: number
  id: string
}

export interface DefaultNavbarProps extends BaseNavbarProps {
  isTitleOnly?: boolean
  date: string
  status?: QnaProgressStatusEnum
  onSettingsClick?: () => void
  onAddPollClick?: () => void
  onShareClick?: () => void
  onStartClick?: () => void
  onEndClick?: () => void
  showShareButton?: boolean
  showSettingsButton?: boolean
}

export interface UserNavbarProps extends BaseNavbarProps {
  onModeChange?: (mode: NavbarModeEnum) => void
}
