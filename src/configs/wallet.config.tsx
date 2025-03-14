import { Coin98Icon } from '@/components/Icons/Coin98Icon/Coin98Icon'
import { CoinbaseWalletIcon } from '@/components/Icons/CoinbaseWalletIcon/CoinbaseWalletIcon'
import { MetaMaskIcon } from '@/components/Icons/MetaMaskIcon/MetaMaskIcon'
import { WalletConnectIcon } from '@/components/Icons/WalletConnectIcon/WalletConnectIcon'
import { WalletProviderEnum } from '@/types/wallet.types'

export const WALLET_PROVIDERS = [
  {
    id: WalletProviderEnum.MetaMask,
    name: 'MetaMask',
    icon: <MetaMaskIcon />,
  },
  {
    id: WalletProviderEnum.WalletConnect,
    name: 'WalletConnect',
    icon: <WalletConnectIcon />,
  },
  {
    id: WalletProviderEnum.CoinbaseWallet,
    name: 'Coinbase Wallet',
    icon: <CoinbaseWalletIcon />,
  },
  {
    id: WalletProviderEnum.Coin98,
    name: 'Coin98',
    icon: <Coin98Icon />,
  },
]
