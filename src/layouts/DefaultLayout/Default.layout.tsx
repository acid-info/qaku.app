import { Footer, FooterProps } from '@/components/Footer'
import DefaultMobileNav from '@/components/Navbar/DefaultMobileNav'
import DefaultNav from '@/components/Navbar/DefaultNav'
import { SidebarContainer } from '@/components/Sidebar'
import { LayoutContainer } from '@/components/StyledComponents'
import { ApiSubscriptionManager } from '@/containers/ApiSubscriptionManager'
import { WalletFloatingPanelContainer } from '@/containers/WalletFloatingPanelContainer'
import { DefaultNavbarProps, NavbarModeEnum } from '@/types/navbar.types'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = FooterProps & {
  sidebar?: React.ReactNode
  navProps?: Partial<DefaultNavbarProps>
  useAlternativeGap?: boolean
  isWalletPanelOpen: boolean
  closeWalletPanel: () => void
}

export default function DefaultLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <ApiSubscriptionManager />
      <SidebarContainer>{props.sidebar}</SidebarContainer>
      <LayoutContainer>
        <DefaultNav
          mode={NavbarModeEnum.Qna}
          isTitleOnly={true}
          title=""
          startDate={new Date()}
          count={0}
          id=""
          {...props.navProps}
        />
        <DefaultMobileNav sidebar={props.sidebar} {...props} />
        <Main
          $showFooter={props.showFooter}
          $useAlternativeGap={props.useAlternativeGap}
        >
          {props.children}
        </Main>
        <Footer showFooter={props.showFooter} showLogo={props.showLogo} />
      </LayoutContainer>
      <WalletFloatingPanelContainer
        isOpen={props.isWalletPanelOpen}
        onClose={props.closeWalletPanel}
      />
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
  $useAlternativeGap?: boolean
}>`
  width: 100%;
  height: ${({ $showFooter }) =>
    $showFooter
      ? `calc(100vh - var(--default-navbar-height) - var(--footer-height))`
      : `calc(100vh - var(--default-navbar-height))`};
  overflow-y: auto;

  .scrollable-container {
    padding-top: ${({ $useAlternativeGap }) =>
      $useAlternativeGap
        ? 'var(--navbar-alternative-gap)'
        : 'var(--navbar-main-gap)'};
    padding-bottom: calc(var(--navbar-main-gap) * 2);
  }
`
