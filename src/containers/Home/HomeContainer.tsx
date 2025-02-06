import styled from '@emotion/styled'
import React from 'react'

import { ThemeSwitch } from '@/components/ThemeSwitch'
import { breakpoints } from '@/configs/ui.configs'
import { useThemeState } from '@/states/themeState/theme.state'
import { Button } from '@acid-info/lsd-react'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const HomeContainer: React.FC<HomePageProps> = ({
  children,
  ...props
}) => {
  const { toggleMode } = useThemeState()

  return (
    <Container {...props}>
      <ThemeSwitch toggle={toggleMode} />
      <Button>Hello</Button>
    </Container>
  )
}

const Container = styled.div`
  @media (max-width: ${breakpoints.lg}px) {
    margin-inline: 10px;
  }
`
