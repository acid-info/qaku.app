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
