import styled from '@emotion/styled'
import { ReactNode } from 'react'

export type DropdownItemVariantType = 'filled' | 'outlined'

type VariantConfigType = {
  background: {
    default: string
    active: string
    hover: string
  }
  border: string
}

const VARIANT_CONFIG: Record<DropdownItemVariantType, VariantConfigType> = {
  filled: {
    background: {
      default: 'var(--gray)',
      active: 'var(--gray-dark)',
      hover: 'var(--gray-dark)',
    },
    border: '1px solid var(--gray)',
  },
  outlined: {
    background: {
      default: 'transparent',
      active: 'var(--gray-darkest)',
      hover: 'var(--gray-darkest)',
    },
    border: '1px solid var(--gray)',
  },
}

export type DropdownItemProps = {
  children: ReactNode
  onClick?: () => void
  variant?: DropdownItemVariantType
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
  $variant: DropdownItemVariantType
  $active: boolean
}>`
  width: 100%;
  padding: 7px 16px;
  background: ${({ $variant, $active }) =>
    $active
      ? VARIANT_CONFIG[$variant].background.active
      : VARIANT_CONFIG[$variant].background.default};
  border: ${({ $variant }) => VARIANT_CONFIG[$variant].border};
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);

  &:hover {
    background: ${({ $variant }) => VARIANT_CONFIG[$variant].background.hover};
  }
`
