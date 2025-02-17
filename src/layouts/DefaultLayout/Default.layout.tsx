import { Footer, FooterProps } from '@/components/Footer'
import DefaultNav from '@/components/Navbar/DefaultNav'
import { Sidebar } from '@/components/Sidebar'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = FooterProps

export default function DefaultLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <Sidebar />
      <MainContainer>
        <DefaultNav
          mode="qna"
          titleOnly={true}
          title="Polls"
          date={'2023-12-25T15:00:00.000Z'}
          count={5121}
          id="3212345"
        />
        <Main>{props.children}</Main>
        <Footer showFooter={props.showFooter} showLogo={props.showLogo} />
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
