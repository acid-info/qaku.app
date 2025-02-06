import styled from '@emotion/styled'
import React from 'react'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const HomeContainer: React.FC<HomePageProps> = ({
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <h1>Hello World</h1>
    </Container>
  )
}

const Container = styled.div``
