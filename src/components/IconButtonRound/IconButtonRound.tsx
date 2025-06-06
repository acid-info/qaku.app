import styled from '@emotion/styled'
import React, { ReactNode } from 'react'

export type IconButtonRoundSizeType = 'small' | 'medium' | 'large'
export type IconButtonRoundVariantType =
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

type SizeConfigType = {
  size: string
  radius: string
}

const VARIANT_CONFIG: Record<IconButtonRoundVariantType, VariantConfigType> = {
  filled: {
    backgroundColor: 'var(--gray)',
    borderColor: 'var(--gray)',
    textColor: 'var(--white)',
    hoverBackground: 'var(--gray-darker)',
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

const SIZE_CONFIG: Record<IconButtonRoundSizeType, SizeConfigType> = {
  small: {
    size: '16px',
    radius: '40px',
  },
  medium: {
    size: '32px',
    radius: '40px',
  },
  large: {
    size: '64px',
    radius: '48px',
  },
}

export interface IconButtonRoundProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonRoundSizeType
  icon: ReactNode
  variant?: IconButtonRoundVariantType
}

export const IconButtonRound: React.FC<IconButtonRoundProps> = ({
  size = 'medium',
  variant = 'filled',
  icon,
  ...props
}) => {
  return (
    <StyledButton size={size} variant={variant} {...props}>
      <IconWrapper $variant={variant}>{icon}</IconWrapper>
    </StyledButton>
  )
}

const StyledButton = styled.button<{
  size: IconButtonRoundSizeType
  variant: IconButtonRoundVariantType
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  cursor: pointer;
  padding: 0;

  width: ${({ size }) => SIZE_CONFIG[size].size};
  height: ${({ size }) => SIZE_CONFIG[size].size};
  border-radius: ${({ size }) => SIZE_CONFIG[size].radius};

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

const IconWrapper = styled.span<{ $variant: IconButtonRoundVariantType }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
    color: ${({ $variant }) => VARIANT_CONFIG[$variant].iconColor};
  }
`
