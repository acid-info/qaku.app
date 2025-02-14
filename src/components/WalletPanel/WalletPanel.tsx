import styled from '@emotion/styled'
import React from 'react'

import { Button } from '../Button'
import { Tab } from '../Tab'

export type WalletPanelProps = {
  isAuthorized: boolean
  onConnect?: () => void
  onWalletSelect?: (walletType: 'external' | 'qaku') => void
  selectedWallet?: 'external' | 'qaku'
}

export const WalletPanel: React.FC<WalletPanelProps> = ({
  isAuthorized,
  onConnect,
  onWalletSelect,
  selectedWallet,
}) => {
  return (
    <Container>
      <Text>
        <Title>{!isAuthorized ? 'Connect a wallet' : 'Choose a wallet'}</Title>
        <Description>
          {!isAuthorized
            ? 'You can continue with your local Qaku wallet for quick use or add External for enhanced identity'
            : 'Select your local Qaku wallet for quick use or External for enhanced identity'}
        </Description>
      </Text>
      <Actions>
        {!isAuthorized ? (
          <CustomButton onClick={onConnect}>Connect</CustomButton>
        ) : (
          <TabStyled
            variant="secondary"
            options={[
              { id: 'external', label: 'External' },
              { id: 'qaku', label: 'Qaku' },
            ]}
            activeId={selectedWallet}
            onChange={(id) => onWalletSelect?.(id as 'external' | 'qaku')}
          />
        )}
      </Actions>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 16px;
  background-color: var(--gray-darker);
  border-radius: 8px;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Title = styled.h3`
  margin-bottom: 0 !important;
`

const Description = styled.p`
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
  color: var(--white);
  opacity: 0.7;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

const CustomButton = styled(Button)`
  width: 100%;
`

const TabStyled = styled(Tab)`
  width: 100%;
`
