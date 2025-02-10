import styled from '@emotion/styled'
import React from 'react'
import { MainContent } from './MainContent'

export const CreateQnA: React.FC = () => {
  return (
    <Wrapper>
      <MainContent />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
