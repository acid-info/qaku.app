import { useWalletConnection } from '@/../hooks/useWalletConnection'
import { Button } from '@/components/Button'
import { HOME, QnA } from '@/data/routes'
import { WalletConnectionStatusEnum } from '@/types/wallet.types'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { breakpoints } from '@/configs/ui.configs'
import { Hero } from './Hero'

export const LandingPage: React.FC = () => {
  const { openWalletPanel, disconnectWallet, walletState } =
    useWalletConnection()
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (
      isConnecting &&
      walletState.status === WalletConnectionStatusEnum.Connected
    ) {
      router.push(HOME)
      setIsConnecting(false)
    }
  }, [walletState.status, router, isConnecting])

  const handleConnectWallet = () => {
    if (walletState.status === WalletConnectionStatusEnum.Connected) {
      disconnectWallet()
    } else {
      setIsConnecting(true)
      openWalletPanel()
    }
  }

  return (
    <LandingWrapper>
      <ContentContainer>
        <Hero />
        <ButtonGroup>
          <Link href={QnA.CREATE}>
            <Button size="large">Create quick Q&A</Button>
          </Link>
          <Button
            onClick={handleConnectWallet}
            size="large"
            variant="filledPrimary"
          >
            {walletState.status === WalletConnectionStatusEnum.Connected
              ? 'Disconnect Wallet'
              : 'Connect Wallet'}
          </Button>
        </ButtonGroup>
      </ContentContainer>
      <Video autoPlay loop muted playsInline>
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </Video>
    </LandingWrapper>
  )
}

const LandingWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 24px;
  position: relative;

  @media (max-width: ${breakpoints.sm}px) {
    flex-direction: column;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 574px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 32px;

  @media (max-width: ${breakpoints.sm}px) {
    position: fixed;
    bottom: 16px;
    left: 16px;
    width: calc(100% - 32px);

    button {
      height: 64px;
      padding: unset;
    }

    a,
    button {
      width: 100%;
    }
  }
`

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  right: -10%;

  @media (max-width: ${breakpoints.sm}px) {
    position: absolute;
    height: fit-content;
    top: 36vh;
    right: 0;
    left: 0;
    width: 75vw;
    margin: auto;
  }
`
