import { useWalletConnection } from '@/../hooks/useWalletConnection'
import { Button } from '@/components/Button'
import { HOME, qna } from '@/data/routes'
import { WalletConnectionStatusEnum } from '@/types/wallet.types'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

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
          <Link href={qna.CREATE}>
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
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 574px;
`

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 32px;
`

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  right: -10%;

  @media (max-width: 768px) {
    height: fit-content;
    top: 340px;
    right: 0;
  }
`
