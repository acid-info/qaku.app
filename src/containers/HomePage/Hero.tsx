import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'

export const Hero: React.FC = () => {
  return (
    <HeroWrapper>
      <Logo
        width={87}
        height={84}
        src="/brand/qaku-logo-white.svg"
        alt="Qaku logo"
      />
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

const Logo = styled(Image)`
  object-fit: contain;
  object-position: center;
`

const Title = styled.h1`
  margin-top: 40px;
  font-size: 56px;
  line-height: 64px;
`
