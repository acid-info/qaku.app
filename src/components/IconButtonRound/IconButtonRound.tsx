import styled from '@emotion/styled'
import React, { ReactNode } from 'react'

export type IconButtonRoundSize = 'small' | 'medium' | 'large'
export type IconButtonRoundVariant =
  | 'filled'
  | 'outlined'
  | 'filledPrimary'
  | 'outlinedPrimary'

export interface IconButtonRoundProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonRoundSize
  icon: ReactNode
  variant?: IconButtonRoundVariant
}

export const IconButtonRound: React.FC<IconButtonRoundProps> = ({
  size = 'medium',
  variant = 'filled',
  icon,
  ...props
}) => {
  return (
    <StyledButton size={size} variant={variant} {...props}>
      <IconWrapper>{icon}</IconWrapper>
    </StyledButton>
  )
}

const getBackgroundColor = (variant: IconButtonRoundVariant) => {
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

const getBorderColor = (variant: IconButtonRoundVariant) => {
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

const getTextColor = (variant: IconButtonRoundVariant) => {
  return variant === 'filledPrimary' ? 'var(--black)' : 'var(--white)'
}

const getHoverBackground = (variant: IconButtonRoundVariant) => {
  switch (variant) {
    case 'filled':
      return 'var(--gray-darker)'
    case 'outlined':
      return 'var(--gray-darkest)'
    case 'filledPrimary':
      return 'var(--yellow-dark)'
    case 'outlinedPrimary':
      return 'color-mix(in srgb, var(--yellow) 20%, transparent)'
  }
}

const getDimensions = (size: IconButtonRoundSize) => {
  switch (size) {
    case 'small':
      return {
        size: '16px',
        radius: '40px',
      }
    case 'medium':
      return {
        size: '32px',
        radius: '40px',
      }
    case 'large':
      return {
        size: '64px',
        radius: '48px',
      }
  }
}

const StyledButton = styled.button<{
  size: IconButtonRoundSize
  variant: IconButtonRoundVariant
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0;

  ${({ size }) => {
    const dimensions = getDimensions(size)
    return `
      width: ${dimensions.size};
      height: ${dimensions.size};
      border-radius: ${dimensions.radius};
    `
  }}

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

  svg {
    width: 14px;
    height: 14px;
  }
`
