import { CoinbaseWalletIcon } from '@/components/Icons/CoinbaseWalletIcon/CoinbaseWalletIcon'
import { MetaMaskIcon } from '@/components/Icons/MetaMaskIcon/MetaMaskIcon'
import { WalletProviderEnum } from '@/types/wallet.types'

export const WALLET_PROVIDERS = [
  {
    id: WalletProviderEnum.MetaMask,
    name: 'MetaMask',
    icon: <MetaMaskIcon />,
  },
  {
    id: WalletProviderEnum.CoinbaseWallet,
    name: 'Coinbase Wallet',
    icon: <CoinbaseWalletIcon />,
  },
]
