import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

const Root = styled.div``

const Main = styled.main``

export default function DefaultLayout(props: PropsWithChildren) {
  return (
    <Root>
      <Main>{props.children}</Main>
    </Root>
  )
}
