import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

import { generateRandomPassword } from '@/utils/general.utils'
import { Button } from '../Button'

export interface PasswordGeneratorProps {
  onChange?: (password: string) => void
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  onChange,
}) => {
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    const newPassword = generateRandomPassword()
    setPassword(newPassword)
    onChange?.(newPassword)
  }

  // Generate password on component mount
  useEffect(() => {
    generatePassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onChange?.(password)
  }, [onChange, password])

  return (
    <Container>
      <PasswordDisplay>{password}</PasswordDisplay>
      <Button variant="outlined" onClick={generatePassword}>
        Generate New
      </Button>
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
