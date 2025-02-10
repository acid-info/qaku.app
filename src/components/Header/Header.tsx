import styled from '@emotion/styled'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <ButtonGroupWrapper>
      <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
      <WalletDropdown>0xC00B...f441</WalletDropdown>
    </ButtonGroupWrapper>
  )
}

const ButtonGroupWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  color: var(--white);
  padding: 16px;
`

const ConnectWalletButton = styled.button`
  background: var(--gray);
  gap: 8px;
  margin: auto 0;
  padding: 8px 16px;
  color: var(--white);
  border: none;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  cursor: pointer;
`

const WalletDropdown = styled.div`
  align-items: center;
  background: var(--gray);
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  margin: auto 0;
  padding: 8px 16px;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`
