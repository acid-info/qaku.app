import styled from '@emotion/styled'
import React from 'react'
import { Button } from '../Button'
import { Tab } from '../Tab'
import { WalletPanelProps } from './walletpanel.types'

export const walletPanelTexts = {
  title: (isAuthorized: boolean) =>
    !isAuthorized ? 'Integrate a wallet' : 'Choose a wallet',
  description: (isAuthorized: boolean) =>
    !isAuthorized
      ? 'Add an External wallet for enhanced identity'
      : 'Select your local Qaku wallet for quick use or External for enhanced identity',
}

export const WalletPanelActions: React.FC<
  WalletPanelProps & { className?: string }
> = ({
  isAuthorized,
  onConnect,
  onWalletSelect,
  selectedWallet,
  className,
}) => {
  if (!isAuthorized) {
    return (
      <StyledButton onClick={onConnect} className={className}>
        Connect
      </StyledButton>
    )
  }

  return (
    <StyledTab
      variant="tertiary"
      options={[
        { id: 'external', label: 'External' },
        { id: 'qaku', label: 'Qaku' },
      ]}
      activeId={selectedWallet}
      onChange={(id: string | number) =>
        onWalletSelect?.(id as 'external' | 'qaku')
      }
    />
  )
}

const StyledButton = styled(Button)`
  width: 100%;
`

const StyledTab = styled(Tab)`
  width: 100%;
`
