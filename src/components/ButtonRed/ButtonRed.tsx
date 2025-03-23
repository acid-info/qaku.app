import styled from '@emotion/styled'
import React from 'react'
import { Button, ButtonProps } from '../Button/Button'

export type ButtonRedProps = Omit<ButtonProps, 'variant'>

export const ButtonRed: React.FC<ButtonRedProps> = (props) => {
  return <StyledButton variant="outlined" {...props} />
}

const StyledButton = styled(Button)`
  border-color: var(--red);

  svg path {
    fill: var(--red);
  }

  &:not(:disabled):hover {
    background-color: color-mix(in srgb, var(--red) 20%, transparent);
  }
`
