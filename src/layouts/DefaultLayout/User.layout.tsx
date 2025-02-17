import { Footer, FooterProps } from '@/components/Footer'
import UserNav from '@/components/Navbar/UserNav'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = FooterProps

export default function UserLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <MainContainer>
        <UserNav
          mode={'qna'}
          title="Town Hall 2025 - New Positions, Updates, And Plans"
          count={3}
          id="3212345"
          onModeChange={(newMode) => console.log(newMode)}
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
