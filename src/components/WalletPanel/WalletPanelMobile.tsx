import styled from '@emotion/styled'
import React, { useState } from 'react'

import { IconButtonRound } from '../IconButtonRound'
import { ChevronDownIcon } from '../Icons/ChevronDownIcon'
import { ChevronUpIcon } from '../Icons/ChevronUpIcon'
import { WalletPanelActions, walletPanelTexts } from './WalletPanelCore'
import { WalletPanelProps } from './walletpanel.types'

export const WalletPanelMobile: React.FC<WalletPanelProps> = (props) => {
  const { isAuthorized } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container $isAuthorized={isAuthorized}>
      <HeaderContent>
        <Title>{walletPanelTexts.title(isAuthorized)}</Title>
        <ButtonsContainer>
          {!isAuthorized && <WalletPanelActions {...props} />}
          <ChevronButton
            variant="outlined"
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setIsOpen(!isOpen)}
          />
        </ButtonsContainer>
      </HeaderContent>
      <MobileContent $isOpen={isOpen}>
        {!isAuthorized ? (
          <Description>
            {walletPanelTexts.description(isAuthorized)}
          </Description>
        ) : (
          <WalletPanelActions {...props} />
        )}
      </MobileContent>
    </Container>
  )
}

const Container = styled.div<{ $isAuthorized: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isAuthorized }) => (!$isAuthorized ? '24px' : '16px')};
  width: 100%;
  padding: 16px;
  background-color: var(--gray-darker);
  border-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 1;
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Title = styled.h3`
  margin-bottom: 0 !important;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`

const ChevronButton = styled(IconButtonRound)`
  flex-shrink: 0;
`

const Description = styled.p`
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
  color: var(--white);
  opacity: 0.7;
`

const MobileContent = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  width: 100%;
`
