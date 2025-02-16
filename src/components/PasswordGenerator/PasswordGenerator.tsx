import styled from '@emotion/styled'
import React from 'react'

import { Button } from '../Button'

export const PasswordGenerator: React.FC = () => {
  return (
    <Container>
      <PasswordDisplay>djqrw0xu2n6Bt5S</PasswordDisplay>
      <Button variant="outlined">Generate New</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--gray-ultradark);
`

const PasswordDisplay = styled.span`
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
`
