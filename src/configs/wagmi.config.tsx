import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import { cookieStorage, createStorage } from '@wagmi/core'

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
export const SUPPORTED_CHAINS = [mainnet]
export const DEFAULT_CHAIN = mainnet

if (!WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Project ID is not defined')
}

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: WALLET_CONNECT_PROJECT_ID,
  networks: SUPPORTED_CHAINS,
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
