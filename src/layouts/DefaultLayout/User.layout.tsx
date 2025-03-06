import { Footer, FooterProps } from '@/components/Footer'
import UserNav from '@/components/Navbar/UserNav'
import { DefaultNavbarProps, NavbarModeEnum } from '@/types/navbar.types'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = FooterProps & {
  onModeChange: (mode: NavbarModeEnum) => void
  navProps?: Partial<DefaultNavbarProps>
}

export default function UserLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <Container>
        <UserNav
          mode={NavbarModeEnum.Qna}
          title=""
          count={0}
          id=""
          onModeChange={props.onModeChange}
          {...props.navProps}
        />
        <Main $showFooter={props.showFooter}>{props.children}</Main>
        <Footer showFooter={props.showFooter} showLogo={props.showLogo} />
      </Container>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  background: var(--black);
  width: 100%;
  height: 100vh;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Main = styled.main<{ $showFooter?: boolean }>`
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
