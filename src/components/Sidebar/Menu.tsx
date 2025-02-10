import styled from '@emotion/styled'
import React from 'react'

const Wrapper = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;
  align-items: center;
  gap: 40px 75px;
  justify-content: space-between;
`

const Title = styled.h2`
  color: var(--white);
  margin: auto 0;
`

export const Menu: React.FC = () => {
  return (
    <Wrapper>
      <Title>Your Q&As</Title>
    </Wrapper>
  )
}
