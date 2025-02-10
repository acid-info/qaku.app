import styled from '@emotion/styled'
import React from 'react'
import { CreateNewQaku } from './CreateNewQaku'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto 0;
`

export const MainContent: React.FC = () => {
  return (
    <Wrapper>
      <CreateNewQaku />
    </Wrapper>
  )
}
