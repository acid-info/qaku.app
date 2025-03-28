export enum WalletProviderEnum {
  MetaMask = 'metamask',
  CoinbaseWallet = 'coinbasewallet',
}

export enum WalletConnectionStatusEnum {
  Connected = 'connected',
  Connecting = 'connecting',
  Disconnected = 'disconnected',
  Error = 'error',
}

export interface WalletStateInterface {
  status: WalletConnectionStatusEnum
  address: string | null
  localAddress: string
  chainId: number | null
  provider: WalletProviderEnum | null
  ensName?: string | null
  userName?: string | null
}
