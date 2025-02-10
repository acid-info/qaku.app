import { Footer } from '@/components/Footer'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

const Root = styled.div`
  background: var(--black);
  width: 100%;
  height: 100%;
`

const Main = styled.main`
  width: 100%;
  height: 100%;
`

export default function HomeLayout(props: PropsWithChildren) {
  return (
    <Root>
      <Main>{props.children}</Main>
      <Footer />
    </Root>
  )
}
