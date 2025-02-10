import { QakuLogo } from '@/components/Icons/QakuLogo'
import styled from '@emotion/styled'
import React from 'react'

export const Hero: React.FC = () => {
  return (
    <HeroWrapper>
      <QakuLogo width={87} height={84} />

      <Title>
        Qaku!
        <br />
        Q&A in a few clicks
      </Title>
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  text-align: center;
`

const Title = styled.h1`
  margin-top: 40px;
  font-size: var(--display-font-size);
  line-height: var(--display-line-height);
`
