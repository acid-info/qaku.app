import styled from '@emotion/styled'
import React, { ReactNode } from 'react'

export type IconButtonRoundSize = 'small' | 'medium' | 'large'
export type IconButtonRoundVariant =
  | 'filled'
  | 'outlined'
  | 'filledPrimary'
  | 'outlinedPrimary'

type VariantConfig = {
  backgroundColor: string
  borderColor: string
  textColor: string
  hoverBackground: string
}

type SizeConfig = {
  size: string
  radius: string
}

const VARIANT_CONFIG: Record<IconButtonRoundVariant, VariantConfig> = {
  filled: {
    backgroundColor: 'var(--gray)',
    borderColor: 'var(--gray)',
    textColor: 'var(--white)',
    hoverBackground: 'var(--gray-darker)',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: 'var(--gray)',
    textColor: 'var(--white)',
    hoverBackground: 'var(--gray-darkest)',
  },
  filledPrimary: {
    backgroundColor: 'var(--yellow)',
    borderColor: 'var(--yellow)',
    textColor: 'var(--black)',
    hoverBackground: 'var(--yellow-dark)',
  },
  outlinedPrimary: {
    backgroundColor: 'transparent',
    borderColor: 'var(--yellow)',
    textColor: 'var(--white)',
    hoverBackground: 'color-mix(in srgb, var(--yellow) 20%, transparent)',
  },
}

const SIZE_CONFIG: Record<IconButtonRoundSize, SizeConfig> = {
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

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }
`
