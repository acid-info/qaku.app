import { WalletProviderEnum } from '@/types/wallet.types'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import { cookieStorage, createStorage } from '@wagmi/core'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
export const SUPPORTED_CHAINS = [mainnet]
export const DEFAULT_CHAIN = mainnet

if (!WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Project ID is not defined')
}

export const WAGMI_CONNECTORS = {
  [WalletProviderEnum.MetaMask]: metaMask(),
  [WalletProviderEnum.CoinbaseWallet]: coinbaseWallet(),
  [WalletProviderEnum.WalletConnect]: walletConnect({
    projectId: WALLET_CONNECT_PROJECT_ID,
  }),
}

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: WALLET_CONNECT_PROJECT_ID,
  networks: SUPPORTED_CHAINS,
  connectors: [
    WAGMI_CONNECTORS[WalletProviderEnum.MetaMask],
    WAGMI_CONNECTORS[WalletProviderEnum.CoinbaseWallet],
    WAGMI_CONNECTORS[WalletProviderEnum.WalletConnect],
  ],
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
