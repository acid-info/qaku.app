import { Footer } from '@/components/Footer'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

export default function HomeLayout(props: PropsWithChildren) {
  return (
    <Root>
      <Main>{props.children}</Main>
      <Footer />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100vh;
`

const Main = styled.main`
  width: 100%;
  height: calc(100% - var(--footer-height));
`
