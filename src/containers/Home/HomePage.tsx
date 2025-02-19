import { Button } from '@/components/Button'
import { Hero } from '@/components/Home/Hero'
import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'

export const HomePage: React.FC = () => {
  return (
    <Wrapper>
      <ContentContainer>
        <Hero />
        <ButtonGroup>
          <Link href={'/qna/create'}>
            <Button variant="filledPrimary">Create quick Q&A</Button>
          </Link>
          <Link href={'/home'}>
            <Button variant="filled">Connect Wallet</Button>
          </Link>
        </ButtonGroup>
      </ContentContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
