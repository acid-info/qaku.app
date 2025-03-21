import { SETTINGS } from '@/data/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconButtonRound } from '../IconButtonRound'
import { ChevronUpIcon } from '../Icons/ChevronUpIcon'
import { SettingsIcon } from '../Icons/SettingsIcon'

export const SettingsButton: React.FC = () => {
  const router = useRouter()
  const isSettingsPage = router.pathname === SETTINGS

  return isSettingsPage ? (
    <IconButtonRound
      style={{ transform: 'rotate(-90deg)' }}
      onClick={() => router.back()}
      icon={<ChevronUpIcon />}
    />
  ) : (
    <Link href={SETTINGS}>
      <IconButtonRound icon={<SettingsIcon />} />
    </Link>
  )
}
