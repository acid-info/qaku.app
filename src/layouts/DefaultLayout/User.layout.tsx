import { Footer, FooterProps } from '@/components/Footer'
import UserNav from '@/components/Navbar/UserNav'
import { NavbarMode } from '@/types/navbar.types'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

type Props = FooterProps & {
  mode: NavbarMode
}

export default function UserLayout(props: PropsWithChildren<Props>) {
  const router = useRouter()

  const handleModeChange = (newMode: NavbarMode) => {
    if (newMode === 'polls') {
      router.push('/user/polls')
    } else {
      router.push('/user/qna')
    }
  }

  return (
    <Root>
      <Container>
        <UserNav
          mode={props.mode}
          title="Town Hall 2025 - New Positions, Updates, And Plans dasdasd sffsd"
          count={3}
          id="3212345"
          onModeChange={handleModeChange}
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
