import styled from '@emotion/styled'
import { Button } from '../Button'
import { LinkIcon } from '../Icons/LinkIcon'

const WalletConnect = () => {
  return (
    <Container>
      <Button>Connect Wallet</Button>
      <Button icon={<LinkIcon />}>Button</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 2px;
`

export default WalletConnect
