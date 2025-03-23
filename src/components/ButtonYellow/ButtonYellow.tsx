import styled from '@emotion/styled'
import React from 'react'
import { Button, ButtonProps } from '../Button/Button'

export type ButtonYellowProps = Omit<ButtonProps, 'variant'>

export const ButtonYellow: React.FC<ButtonYellowProps> = (props) => {
  return <StyledButton variant="outlined" {...props} />
}

const StyledButton = styled(Button)`
  border-color: var(--yellow);

  svg path {
    fill: var(--yellow);
  }

  &:not(:disabled):hover {
    background-color: color-mix(in srgb, var(--yellow) 20%, transparent);
  }
`
