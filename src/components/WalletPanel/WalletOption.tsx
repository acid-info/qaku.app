import { WalletProviderEnum } from '@/types/wallet.types'
import styled from '@emotion/styled'
import React from 'react'

type WalletOptionProps = {
  id: WalletProviderEnum
  name: string
  icon: React.ReactNode
  onClick: (id: WalletProviderEnum) => void
}

export const WalletOption: React.FC<WalletOptionProps> = ({
  id,
  name,
  icon,
  onClick,
}) => {
  return (
    <Container onClick={() => onClick(id)}>
      <h3>{name}</h3>
      <IconContainer>{icon}</IconContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 16px 24px;
  background-color: var(--gray-darker);
  border-radius: 8px;
  border: 1px solid var(--gray);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: var(--gray-light);
  }
`

const IconContainer = styled.div`
  width: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
`
