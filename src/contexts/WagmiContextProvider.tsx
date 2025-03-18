'use client'

import {
  DEFAULT_CHAIN,
  SUPPORTED_CHAINS,
  wagmiAdapter,
  WALLET_CONNECT_PROJECT_ID,
} from '@/configs/wagmi.config'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient()

if (!WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Project ID is not defined')
}

// Create the walletConnect modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId: WALLET_CONNECT_PROJECT_ID,
  networks: [DEFAULT_CHAIN, ...SUPPORTED_CHAINS],
  defaultNetwork: DEFAULT_CHAIN,
  features: {
    email: false,
    socials: false,
  },
})

export function WagmiContextProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  )

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
