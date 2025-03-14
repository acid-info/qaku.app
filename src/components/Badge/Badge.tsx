import styled from '@emotion/styled'
import React from 'react'
import { WarningIcon } from '../Icons/WarningIcon/WarningIcon'

export type BadgeVariantType = 'green' | 'red'

type VariantConfigType = {
  backgroundColor: string
  color: string
}

const VARIANT_CONFIG: Record<BadgeVariantType, VariantConfigType> = {
  green: {
    backgroundColor: 'color-mix(in srgb, var(--green) 16%, transparent)',
    color: 'var(--green)',
  },
  red: {
    backgroundColor: 'color-mix(in srgb, var(--orange) 16%, transparent)',
    color: 'var(--orange)',
  },
}

export interface BadgeProps {
  title: string
  variant?: BadgeVariantType
  props?: React.HTMLAttributes<HTMLSpanElement>
}

export const Badge: React.FC<BadgeProps> = ({
  title,
  variant = 'green',
  ...props
}) => {
  return (
    <StyledBadge variant={variant} {...props}>
      <IconContainer>
        <WarningIcon color={VARIANT_CONFIG[variant].color} />
      </IconContainer>
      <span>{title}</span>
    </StyledBadge>
  )
}

const StyledBadge = styled.div<{
  variant: BadgeVariantType
}>`
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 8px;
  gap: 16px;
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);

  background-color: ${({ variant }) => VARIANT_CONFIG[variant].backgroundColor};

  span {
    color: ${({ variant }) => VARIANT_CONFIG[variant].color};
    white-space: pre-line;
  }
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 4px;
`
