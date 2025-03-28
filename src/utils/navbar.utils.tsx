import { ButtonColored } from '@/components/ButtonColored/ButtonColored'
import { DeleteIcon } from '@/components/Icons/DeleteIcon'
import { PlayArrowIcon } from '@/components/Icons/PlayArrowIcon'
import { StopIcon } from '@/components/Icons/StopIcon'
import { ModalProps } from '@/components/Modal/Modal'
import { USER } from '@/data/routes'
import { NavbarModeEnum } from '@/types/navbar.types'
import { NextRouter } from 'next/router'

export type ConfirmActionType = 'start' | 'end' | 'delete' | null

interface GetNavModalPropsParams {
  confirmAction: ConfirmActionType
  mode: NavbarModeEnum
  onStartClick?: () => void
  onEndClick?: () => void
  onDeleteClick?: () => void
  setConfirmAction: (action: ConfirmActionType) => void
}

export const getNavModalProps = ({
  confirmAction,
  mode,
  onStartClick,
  onEndClick,
  onDeleteClick,
  setConfirmAction,
}: GetNavModalPropsParams): ModalProps => {
  const isQna = mode === NavbarModeEnum.Qna
  const contentType = isQna ? 'Q&A' : 'Poll'

  switch (confirmAction) {
    case 'start':
      return {
        title: `Open ${contentType}?`,
        description: `This will show the ${contentType} in your view and that of your participants.`,
        mainAction: (
          <ButtonColored
            color="var(--yellow)"
            icon={<PlayArrowIcon />}
            onClick={() => {
              onStartClick?.()
              setConfirmAction(null)
            }}
          >
            Open
          </ButtonColored>
        ),
        onCancel: () => setConfirmAction(null),
      }
    case 'end':
      return {
        title: `Close ${contentType}?`,
        description: `This will hide the ${contentType} from your view and that of your participants. Any existing ${
          isQna ? 'questions' : 'votes'
        } will be securely stored.`,
        mainAction: (
          <ButtonColored
            color="var(--red)"
            icon={<StopIcon />}
            onClick={() => {
              onEndClick?.()
              setConfirmAction(null)
            }}
          >
            Close
          </ButtonColored>
        ),
        onCancel: () => setConfirmAction(null),
      }
    case 'delete':
      return {
        title: `Delete ${contentType}?`,
        description: `All the ${contentType} data will be lost.`,
        mainAction: (
          <ButtonColored
            color="var(--red)"
            icon={<DeleteIcon />}
            onClick={() => {
              onDeleteClick?.()
              setConfirmAction(null)
            }}
          >
            Delete
          </ButtonColored>
        ),
        onCancel: () => setConfirmAction(null),
      }
    default:
      return {
        title: '',
        description: '',
        onCancel: () => setConfirmAction(null),
      }
  }
}

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
    router.push(USER.POLLS.replace(':id', qnaId))
  } else {
    router.push(USER.QNA.replace(':id', qnaId))
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

export const formatDate = (date: Date) => {
  const today = new Date()
  if (date?.toDateString() === today.toDateString()) {
    return 'Today'
  }

  return date?.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
