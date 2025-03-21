import { isWalletPanelOpenAtom } from '@/../atoms/wallet/walletAtom'
import { useWalletConnection } from '@/../hooks/useWalletConnection'
import UserLayout from '@/layouts/DefaultLayout/User.layout'
import { DefaultNavbarProps, NavbarModeEnum } from '@/types/navbar.types'
import { useAtomValue } from 'jotai'
import { PropsWithChildren } from 'react'

type UserLayoutContainerProps = {
  navProps?: Partial<DefaultNavbarProps>
  onModeChange: (mode: NavbarModeEnum) => void
  showFooter?: boolean
  showLogo?: boolean
}

export const UserLayoutContainer = ({
  children,
  navProps,
  onModeChange,
  showFooter,
  showLogo,
}: PropsWithChildren<UserLayoutContainerProps>) => {
  const isWalletPanelOpen = useAtomValue(isWalletPanelOpenAtom)
  const { closeWalletPanel } = useWalletConnection()

  return (
    <UserLayout
      navProps={navProps}
      onModeChange={onModeChange}
      showFooter={showFooter}
      showLogo={showLogo}
      isWalletPanelOpen={isWalletPanelOpen}
      closeWalletPanel={closeWalletPanel}
    >
      {children}
    </UserLayout>
  )
}
