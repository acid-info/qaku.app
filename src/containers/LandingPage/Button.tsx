import styled from '@emotion/styled'
import React from 'react'

interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  return <StyledButton variant={variant}>{children}</StyledButton>
}

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  background: ${({ variant }) =>
    variant === 'primary' ? 'var(--yellow)' : 'var(--gray)'};
  color: ${({ variant }) =>
    variant === 'primary' ? 'var(--black)' : 'var(--white)'};
  text-align: center;
  width: auto;
  padding: 22px 40px;
  border: none;
  font-size: var(--body2-font-size);
  font-weight: var(--body2-font-weight);
  cursor: pointer;
`
