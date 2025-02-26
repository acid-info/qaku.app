import styled from '@emotion/styled'
import React, { ReactNode } from 'react'

export type ButtonSizeType = 'medium' | 'large'
export type ButtonVariantType =
  | 'filled'
  | 'outlined'
  | 'filledPrimary'
  | 'outlinedPrimary'

type VariantConfigType = {
  backgroundColor: string
  borderColor: string
  textColor: string
  hoverBackground: string
  iconColor: string
}

const VARIANT_CONFIG: Record<ButtonVariantType, VariantConfigType> = {
  filled: {
    backgroundColor: 'var(--gray)',
    borderColor: 'var(--gray)',
    textColor: 'var(--white)',
    hoverBackground: 'var(--gray-dark)',
    iconColor: 'var(--white)',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: 'var(--gray)',
    textColor: 'var(--white)',
    hoverBackground: 'var(--gray-darkest)',
    iconColor: 'var(--white)',
  },
  filledPrimary: {
    backgroundColor: 'var(--yellow)',
    borderColor: 'var(--yellow)',
    textColor: 'var(--black)',
    hoverBackground: 'var(--yellow-dark)',
    iconColor: 'var(--black)',
  },
  outlinedPrimary: {
    backgroundColor: 'transparent',
    borderColor: 'var(--yellow)',
    textColor: 'var(--white)',
    hoverBackground: 'color-mix(in srgb, var(--yellow) 20%, transparent)',
    iconColor: 'var(--white)',
  },
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType
  icon?: ReactNode
  variant?: ButtonVariantType
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  variant = 'filled',
  icon,
  children,
  ...props
}) => {
  return (
    <StyledButton size={size} variant={variant} {...props}>
      {children}
      {icon && <IconWrapper $variant={variant}>{icon}</IconWrapper>}
    </StyledButton>
  )
}

const getPadding = (size: ButtonSizeType) => {
  const horizontalPadding = size === 'medium' ? 16 : 40
  const verticalPadding = size === 'large' ? 21 : 7

  return `${verticalPadding}px ${horizontalPadding}px`
}

const StyledButton = styled.button<{
  size: ButtonSizeType
  variant: ButtonVariantType
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;

  padding: ${({ size }) => getPadding(size)};

  font-size: ${({ size }) =>
    size === 'medium' ? 'var(--label1-font-size)' : 'var(--body2-font-size)'};
  line-height: ${({ size }) =>
    size === 'medium'
      ? 'var(--label1-line-height)'
      : 'var(--body2-line-height)'};

  background-color: ${({ variant }) => VARIANT_CONFIG[variant].backgroundColor};
  border-color: ${({ variant }) => VARIANT_CONFIG[variant].borderColor};
  color: ${({ variant }) => VARIANT_CONFIG[variant].textColor};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${({ variant }) =>
      VARIANT_CONFIG[variant].hoverBackground};
  }
`

const IconWrapper = styled.span<{ $variant: ButtonVariantType }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ $variant }) => VARIANT_CONFIG[$variant].iconColor};
  }
`
