import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { Button } from './Button'
import { Hero } from './Hero'

export const LandingPage: React.FC = () => {
  return (
    <LandingWrapper>
      <ContentContainer>
        <Hero />
        <ButtonGroup>
          <Link href={'/qna/create'}>
            <Button variant="secondary">Create quick Q&A</Button>
          </Link>
          <Link href={'/home'}>
            <Button variant="primary">Connect Wallet</Button>
          </Link>
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
