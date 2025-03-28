import styled from '@emotion/styled'
import React from 'react'
import { WalletPanelActions, walletPanelTexts } from './WalletPanelCore'
import { WalletPanelProps } from './walletpanel.types'

export const WalletPanel: React.FC<WalletPanelProps> = (props) => {
  const { isAuthorized } = props

  return (
    <Container>
      <Text>
        <Title>{walletPanelTexts.title(isAuthorized)}</Title>
        <Description>{walletPanelTexts.description(isAuthorized)}</Description>
      </Text>
      <Actions>
        <WalletPanelActions {...props} />
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
