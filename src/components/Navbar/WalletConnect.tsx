import { useWalletConnection } from '@/../hooks/useWalletConnection'
import { truncateAddress } from '@/utils/wallet.utils'
import styled from '@emotion/styled'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'

type WalletConnectProps = {
  secondaryButton?: React.ReactNode
  connectWalletButtonLabel?: string
}

const WalletConnect = ({
  secondaryButton = null,
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
      {secondaryButton}
      {walletState.status !== 'connected' ? (
        <Button onClick={handleConnect}>{connectWalletButtonLabel}</Button>
      ) : (
        <Dropdown
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

export default WalletConnect
