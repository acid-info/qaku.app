import { WALLET_PROVIDERS } from '@/configs/wallet.config'
import { WalletProviderEnum } from '@/types/wallet.types'
import React from 'react'
import { Badge } from '../Badge'
import { WalletOption } from '../WalletPanel/WalletOption'
import { FloatingPanel } from './FloatingPanel'
import { PanelContent, SettingStack } from './styledComponents'

const BADGE_MESSAGE =
  "To proceed, you'll be asked to sign a message with your wallet. This confirms ownership and enables features like ENS display, identity verification, and seamless interaction on the platform. \n\n No funds will be transferred."

export interface WalletFloatingPanelProps {
  isOpen: boolean
  onClose: () => void
  onWalletSelect: (providerId: WalletProviderEnum) => void
}

export const WalletFloatingPanel: React.FC<WalletFloatingPanelProps> = ({
  isOpen,
  onClose,
  onWalletSelect,
}) => {
  return (
    <FloatingPanel
      className="is-above-all"
      title="Connect"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PanelContent>
        <SettingStack>
          <Badge title={BADGE_MESSAGE} />
          {WALLET_PROVIDERS.map((provider) => (
            <WalletOption
              key={provider.id}
              id={provider.id}
              name={provider.name}
              icon={provider.icon}
              onClick={onWalletSelect}
            />
          ))}
        </SettingStack>
      </PanelContent>
    </FloatingPanel>
  )
}
