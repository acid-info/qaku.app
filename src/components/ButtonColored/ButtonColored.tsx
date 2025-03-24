import styled from '@emotion/styled'
import React from 'react'
import { Button, ButtonProps } from '../Button/Button'

export interface ButtonColoredProps extends Omit<ButtonProps, 'variant'> {
  color: string
}

export const ButtonColored: React.FC<ButtonColoredProps> = ({
  color,
  ...props
}) => {
  return <StyledButton variant="outlined" $color={color} {...props} />
}

const StyledButton = styled(Button)<{ $color: string }>`
  border-color: ${(props) => props.$color};

  svg path {
    fill: ${(props) => props.$color};
  }

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      ${(props) => props.$color} 20%,
      transparent
    );
  }
`
