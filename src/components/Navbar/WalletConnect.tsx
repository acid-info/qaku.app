import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'
import { Button } from '../Button'

type WalletConnectProps = {
  secondaryButton?: React.ReactNode
}

const WalletConnect = ({ secondaryButton = null }: WalletConnectProps) => {
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom)

  const handleClick = () => {
    setIsAuthorized((prev) => !prev)
  }

  return (
    <Container>
      {!isAuthorized && <Button onClick={handleClick}>Connect Wallet</Button>}
      {secondaryButton}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 2px;
  height: 32px;
`

export default WalletConnect
