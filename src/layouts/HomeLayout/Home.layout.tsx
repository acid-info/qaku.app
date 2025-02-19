import { Button } from '@/components/Button'
import { Footer, FooterProps } from '@/components/Footer'
import { ChevronDownIcon } from '@/components/Icons/ChevronDownIcon'
import WalletConnect from '@/components/Navbar/WalletConnect'
import { SidebarContainer } from '@/components/Sidebar'
import { LayoutContainer } from '@/components/StyledComponents'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = FooterProps & {
  title?: string
  sidebar?: React.ReactNode
}

export default function HomeLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <SidebarContainer>{props.sidebar}</SidebarContainer>
      <LayoutContainer>
        <Navbar>
          <h1>{props.title}</h1>
          <WalletConnect
            secondaryButton={
              <Button icon={<ChevronDownIcon />}>0xC00B...f441</Button>
            }
          />
        </Navbar>
        <Main>{props.children}</Main>
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

const Main = styled.main`
  width: 100%;
  height: calc(100vh - var(--default-navbar-height) - var(--footer-height));
`

const Navbar = styled.header`
  display: flex;
  width: 100%;
  padding: 16px;

  justify-content: space-between;
  align-items: flex-start;
`
