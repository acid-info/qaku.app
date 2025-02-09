import styled from '@emotion/styled'
import React, { ReactNode } from 'react'

export type ButtonSize = 'medium' | 'large'
export type ButtonVariant =
  | 'filled'
  | 'outlined'
  | 'filledPrimary'
  | 'outlinedPrimary'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  icon?: ReactNode
  variant?: ButtonVariant
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  variant = 'filled',
  icon,
  children,
  ...props
}) => {
  return (
    <StyledButton size={size} variant={variant} hasIcon={!!icon} {...props}>
      {children}
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </StyledButton>
  )
}

const getBackgroundColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'filled':
      return 'var(--gray)'
    case 'filledPrimary':
      return 'var(--yellow)'
    case 'outlined':
    case 'outlinedPrimary':
      return 'transparent'
  }
}

const getBorderColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'filled':
      return 'var(--gray)'
    case 'outlined':
      return 'var(--gray)'
    case 'filledPrimary':
      return 'var(--yellow)'
    case 'outlinedPrimary':
      return 'var(--yellow)'
  }
}

const getTextColor = (variant: ButtonVariant) => {
  return variant === 'filledPrimary' ? 'var(--black)' : 'var(--white)'
}

const getHoverBackground = (variant: ButtonVariant) => {
  switch (variant) {
    case 'filled':
      return 'var(--gray-dark)'
    case 'outlined':
      return 'var(--gray-darker)'
    case 'filledPrimary':
      return 'var(--yellow-darker)'
    case 'outlinedPrimary':
      return 'color-mix(in srgb, var(--yellow) 20%, transparent)'
  }
}

const StyledButton = styled.button<{
  size: ButtonSize
  variant: ButtonVariant
  hasIcon: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  padding: 0 16px;

  height: ${({ size }) => (size === 'medium' ? '32px' : '64px')};
  width: ${({ size, hasIcon }) =>
    size === 'medium' ? (hasIcon ? '89px' : '67px') : '200px'};
  font-size: ${({ size }) => (size === 'medium' ? '14px' : '16px')};

  background-color: ${({ variant }) => getBackgroundColor(variant)};
  border-color: ${({ variant }) => getBorderColor(variant)};
  color: ${({ variant }) => getTextColor(variant)};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${({ variant }) => getHoverBackground(variant)};
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`
