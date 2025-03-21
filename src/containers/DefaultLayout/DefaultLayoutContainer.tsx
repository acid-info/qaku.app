import { isWalletPanelOpenAtom } from '@/../atoms/wallet/walletAtom'
import { useWalletConnection } from '@/../hooks/useWalletConnection'
import DefaultLayout from '@/layouts/DefaultLayout/Default.layout'
import { DefaultNavbarProps } from '@/types/navbar.types'
import { useAtomValue } from 'jotai'
import { PropsWithChildren } from 'react'

type DefaultLayoutContainerProps = {
  sidebar?: React.ReactNode
  navProps?: Partial<DefaultNavbarProps>
  useAlternativeGap?: boolean
  showFooter?: boolean
  showLogo?: boolean
}

export const DefaultLayoutContainer = ({
  children,
  sidebar,
  navProps,
  useAlternativeGap,
  showFooter,
  showLogo,
}: PropsWithChildren<DefaultLayoutContainerProps>) => {
  const isWalletPanelOpen = useAtomValue(isWalletPanelOpenAtom)
  const { closeWalletPanel } = useWalletConnection()

  return (
    <DefaultLayout
      sidebar={sidebar}
      navProps={navProps}
      useAlternativeGap={useAlternativeGap}
      showFooter={showFooter}
      showLogo={showLogo}
      isWalletPanelOpen={isWalletPanelOpen}
      closeWalletPanel={closeWalletPanel}
    >
      {children}
    </DefaultLayout>
  )
}
