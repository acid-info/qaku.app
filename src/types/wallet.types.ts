export enum WalletProviderEnum {
  MetaMask = 'metamask',
  WalletConnect = 'walletconnect',
  CoinbaseWallet = 'coinbasewallet',
}

export type WalletConnectionStatusType =
  | 'connected'
  | 'connecting'
  | 'disconnected'
  | 'error'

export interface WalletStateInterface {
  status: WalletConnectionStatusType
  address: string | null
  chainId: number | null
  provider: WalletProviderEnum | null
  ensName?: string | null
  userName?: string | null
}
