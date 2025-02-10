import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { Button } from './Button'
import { Hero } from './Hero'

export const HomePage: React.FC = () => {
  return (
    <LandingWrapper>
      <ContentContainer>
        <Hero />
        <ButtonGroup>
          <Link href={'/qna/create'}>
            <Button variant="secondary">Create quick Q&A</Button>
          </Link>
          <Link href={'#'}>
            <Button variant="primary">Connect Wallet</Button>
          </Link>
        </ButtonGroup>
      </ContentContainer>
    </LandingWrapper>
  )
}

const LandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  width: 477px;
  max-width: 100%;
  margin: auto;
  flex-direction: column;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`
