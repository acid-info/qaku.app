import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

export default function DefaultLayout(props: PropsWithChildren) {
  return (
    <Root>
      <Sidebar />
      <MainContainer>
        <Header />
        <Main>{props.children}</Main>
        <Footer />
      </MainContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  background: var(--black);
  width: 100%;
  height: 100vh;
`

const MainContainer = styled.div`
  width: 100%;
  height: calc(100% - var(--footer-height) - var(--header-height));
`

const Main = styled.main`
  width: 100%;
  height: 100%;
`
