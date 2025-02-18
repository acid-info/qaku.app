import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'
import { Button } from '../Button'
import { LinkIcon } from '../Icons/LinkIcon'

const WalletConnect = () => {
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom)

  const handleClick = () => {
    setIsAuthorized((prev) => !prev)
  }

  return (
    <Container>
      {!isAuthorized && <Button onClick={handleClick}>Connect Wallet</Button>}

      <Button icon={<LinkIcon />}>Button</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 2px;
`

export default WalletConnect
