import { Footer, FooterProps } from '@/components/Footer'
import DefaultNav from '@/components/Navbar/DefaultNav'
import { SidebarContainer } from '@/components/Sidebar'
import { LayoutContainer } from '@/components/StyledComponents'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type DefaultNavProps = React.ComponentProps<typeof DefaultNav>

type Props = FooterProps & {
  sidebar?: React.ReactNode
  navProps?: Partial<DefaultNavProps>
  useAlternativeGap?: boolean
}

export default function DefaultLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <SidebarContainer>{props.sidebar}</SidebarContainer>
      <LayoutContainer>
        <DefaultNav
          mode="qna"
          isTitleOnly={true}
          title={props.navProps?.title || 'Polls'}
          date={'2023-12-25T15:00:00.000Z'}
          count={5121}
          id="3212345"
          {...props.navProps}
        />
        <Main
          $showFooter={props.showFooter}
          $useAlternativeGap={props.useAlternativeGap}
        >
          {props.children}
        </Main>
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
