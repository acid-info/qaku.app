import { WakuLogo } from '@/components/Icons/WakuLogo'
import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'
import React from 'react'

export const Hero: React.FC = () => {
  return (
    <HeroWrapper>
      <Title>
        Qaku!
        <br />
        Q&A in a few clicks
      </Title>
      <PoweredBy>
        <WakuLogo width={18} height={18} />
        <span>Powered by Waku</span>
      </PoweredBy>
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--white);
  gap: 24px;
`

const PoweredBy = styled.div`
  display: flex;
  gap: 14px;

  span {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }

  @media (min-width: ${breakpoints.sm}px) {
    position: fixed;
    left: 24px;
    bottom: 24px;
  }
`

const Title = styled.h1`
  font-size: var(--display-font-size);
  line-height: var(--display-line-height);

  @media (max-width: ${breakpoints.sm}px) {
    font-size: var(--h1-font-size);
    line-height: var(--h1-line-height);
  }
`
