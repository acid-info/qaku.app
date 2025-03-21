import { useWalletConnection } from '@/../hooks/useWalletConnection'
import { WalletConnectionStatusEnum } from '@/types/wallet.types'
import { truncateAddress } from '@/utils/wallet.utils'
import styled from '@emotion/styled'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'

type WalletConnectProps = {
  children?: React.ReactNode
  connectWalletButtonLabel?: string
}

const WalletConnect = ({
  children = null,
  connectWalletButtonLabel = 'Connect Wallet',
}: WalletConnectProps) => {
  const { walletState, openWalletPanel, disconnectWallet } =
    useWalletConnection()

  const options = [
    { label: 'Disconnect wallet', value: 'disconnect' },
    {
      label: walletState.ensName ?? truncateAddress(walletState.address ?? ''),
      value: 'address',
      hidden: true,
    },
  ]

  const handleConnect = () => {
    openWalletPanel()
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  const handleDropdown = (value: string) => {
    if (value === 'disconnect') {
      handleDisconnect()
    }
  }

  return (
    <Container>
      {children}
      {walletState.status !== WalletConnectionStatusEnum.Connected ? (
        <Button onClick={handleConnect}>{connectWalletButtonLabel}</Button>
      ) : (
        <StyledDropdown
          options={options}
          onChange={(value) => handleDropdown(String(value))}
          value="address"
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 2px;
  height: 32px;
`

const StyledDropdown = styled(Dropdown)`
  min-width: 130px;
`

export default WalletConnect
