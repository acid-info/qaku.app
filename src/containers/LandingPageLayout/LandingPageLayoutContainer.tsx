import { isWalletPanelOpenAtom } from '@/../atoms/wallet/walletAtom'
import { useWalletConnection } from '@/../hooks/useWalletConnection'
import LandingPageLayout from '@/layouts/LandingPageLayout/LandingPage.layout'
import { useAtomValue } from 'jotai'
import { PropsWithChildren } from 'react'

export const LandingPageLayoutContainer = ({ children }: PropsWithChildren) => {
  const isWalletPanelOpen = useAtomValue(isWalletPanelOpenAtom)
  const { closeWalletPanel } = useWalletConnection()

  return (
    <LandingPageLayout
      isWalletPanelOpen={isWalletPanelOpen}
      closeWalletPanel={closeWalletPanel}
    >
      {children}
    </LandingPageLayout>
  )
}
