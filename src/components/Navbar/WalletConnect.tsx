import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'
import { Button } from '../Button'

type WalletConnectProps = {
  children?: React.ReactNode
}

const WalletConnect = ({ children = null }: WalletConnectProps) => {
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom)

  const handleClick = () => {
    setIsAuthorized((prev) => !prev)
  }

  return (
    <Container>
      {children}
      {!isAuthorized && <Button onClick={handleClick}>Connect Wallet</Button>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 2px;
  height: 32px;
`

export default WalletConnect
