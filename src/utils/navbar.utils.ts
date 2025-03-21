import { user } from '@/data/routes'
import { NavbarModeEnum } from '@/types/navbar.types'
import { NextRouter } from 'next/router'

export const handleUserModeChange = ({
  newMode,
  qnaId,
  router,
}: {
  newMode: NavbarModeEnum
  qnaId: string
  router: NextRouter
}) => {
  if (newMode === NavbarModeEnum.Polls) {
    router.push(user.POLLS.replace(':id', qnaId))
  } else {
    router.push(user.QNA.replace(':id', qnaId))
  }
}

export const handleShare = ({
  qnaId,
  pollId,
  mode,
}: {
  qnaId: string | number
  pollId?: string | number
  mode: NavbarModeEnum
}) => {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  const baseUrl = `${url.protocol}//${url.host}`
  const shareUrl =
    mode === NavbarModeEnum.Polls && pollId
      ? `${baseUrl}/user/qna/${qnaId}/polls?poll=${pollId}`
      : `${baseUrl}/user/qna/${qnaId}`

  const successMessage =
    mode === NavbarModeEnum.Polls
      ? 'Share link to user poll view copied to clipboard!'
      : 'Share link to user QnA view copied to clipboard!'

  navigator.clipboard
    .writeText(shareUrl)
    .then(() => alert(successMessage))
    .catch((err) => console.error('Failed to copy link:', err))
}

export const handleUserViewShare = () => {
  if (typeof window === 'undefined') return

  navigator.clipboard
    .writeText(window.location.href)
    .then(() => alert('Share link copied to clipboard!'))
    .catch((err) => console.error('Failed to copy link:', err))
}
