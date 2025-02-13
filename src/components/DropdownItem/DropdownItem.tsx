import styled from '@emotion/styled'
import { ReactNode } from 'react'

export type DropdownItemProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'filled' | 'outlined'
  active?: boolean
}

export const DropdownItem = ({
  children,
  onClick,
  variant = 'filled',
  active = false,
}: DropdownItemProps) => {
  return (
    <StyledDropdownItem onClick={onClick} $variant={variant} $active={active}>
      {children}
    </StyledDropdownItem>
  )
}

const StyledDropdownItem = styled.button<{
  $variant: 'filled' | 'outlined'
  $active: boolean
}>`
  width: 100%;
  padding: 7px 16px;
  border: none;
  background: ${({ $variant, $active }) =>
    $variant === 'filled'
      ? $active
        ? 'var(--gray-dark)'
        : 'var(--gray)'
      : $active
      ? 'var(--gray-darkest)'
      : 'transparent'};
  border: ${({ $variant }) =>
    $variant === 'outlined' ? '1px solid var(--gray)' : 'none'};
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'filled' ? 'var(--gray-dark)' : 'var(--gray-darkest)'};
  }
`
