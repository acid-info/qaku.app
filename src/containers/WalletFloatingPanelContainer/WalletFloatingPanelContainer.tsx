import { useWalletConnection } from '@/../hooks/useWalletConnection'
import { WalletFloatingPanel } from '@/components/FloatingPanel'
import {
  WalletConnectionStatusEnum,
  WalletProviderEnum,
} from '@/types/wallet.types'
import { useEffect } from 'react'

interface WalletFloatingPanelContainerProps {
  isOpen: boolean
  onClose: () => void
}

export const WalletFloatingPanelContainer: React.FC<
  WalletFloatingPanelContainerProps
> = ({ isOpen, onClose }) => {
  const { connectWallet, walletState } = useWalletConnection()

  useEffect(() => {
    if (walletState.status === WalletConnectionStatusEnum.Connected) {
      onClose()
    }
  }, [walletState.status, onClose])

  const handleWalletSelect = (providerId: WalletProviderEnum) => {
    connectWallet(providerId)
  }

  return (
    <WalletFloatingPanel
      isOpen={isOpen}
      onClose={onClose}
      onWalletSelect={handleWalletSelect}
    />
  )
}
