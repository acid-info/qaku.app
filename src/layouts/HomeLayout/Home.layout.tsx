import { Footer, FooterProps } from '@/components/Footer'
import WalletConnect from '@/components/Navbar/WalletConnect'
import { SidebarContainer } from '@/components/Sidebar'
import { LayoutContainer } from '@/components/StyledComponents'
import { ApiSubscriptionManager } from '@/containers/ApiSubscriptionManager'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = FooterProps & {
  sidebar?: React.ReactNode
}

export default function HomeLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <ApiSubscriptionManager />
      <SidebarContainer>{props.sidebar}</SidebarContainer>
      <LayoutContainer>
        <Navbar>
          <h1>{props.title}</h1>
          <WalletConnect />
        </Navbar>
        <Main $showFooter={props.showFooter}>{props.children}</Main>
        <Footer showFooter={props.showFooter} showLogo={props.showLogo} />
      </LayoutContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  background: var(--black);
  width: 100%;
  height: 100vh;
`

const Main = styled.main<{
  $showFooter?: boolean
}>`
  width: 100%;
  height: ${({ $showFooter }) =>
    $showFooter
      ? `calc(100vh - var(--default-navbar-height) - var(--footer-height))`
      : `calc(100vh - var(--default-navbar-height))`};
  overflow-y: auto;

  .scrollable-container {
    padding-top: var(--navbar-main-gap);
    padding-bottom: calc(var(--navbar-main-gap) * 2);
  }
`

const Navbar = styled.header`
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: flex-end;
  align-items: flex-start;
`
