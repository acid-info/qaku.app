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
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--white);
`

const Title = styled.h1`
  font-size: var(--display-font-size);
  line-height: var(--display-line-height);
`
