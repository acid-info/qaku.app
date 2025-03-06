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
    router.push(`/user/qna/${qnaId}/polls`)
  } else {
    router.push(`/user/qna/${qnaId}`)
  }
}
