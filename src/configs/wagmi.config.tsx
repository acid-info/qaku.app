import { WalletProviderEnum } from '@/types/wallet.types'
import { createConfig, http } from '@wagmi/core'
import { mainnet } from 'wagmi/chains'
import { coinbaseWallet, metaMask } from 'wagmi/connectors'

export const WAGMI_CONNECTORS = {
  [WalletProviderEnum.MetaMask]: metaMask(),
  [WalletProviderEnum.CoinbaseWallet]: coinbaseWallet(),
}

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    WAGMI_CONNECTORS[WalletProviderEnum.MetaMask],
    WAGMI_CONNECTORS[WalletProviderEnum.CoinbaseWallet],
  ],
  transports: {
    [mainnet.id]: http(),
  },
})
