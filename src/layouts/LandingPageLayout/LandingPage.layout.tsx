import { Footer } from '@/components/Footer'
import { WalletFloatingPanelContainer } from '@/containers/WalletFloatingPanelContainer'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = {
  isWalletPanelOpen?: boolean
  closeWalletPanel?: () => void
}

export default function LandingPageLayout(props: PropsWithChildren<Props>) {
  return (
    <Root>
      <Main>{props.children}</Main>
      <Footer />
      {props.isWalletPanelOpen !== undefined && props.closeWalletPanel && (
        <WalletFloatingPanelContainer
          isOpen={props.isWalletPanelOpen}
          onClose={props.closeWalletPanel}
        />
      )}
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Main = styled.main`
  width: 100%;
  height: calc(100% - var(--footer-height));
`
