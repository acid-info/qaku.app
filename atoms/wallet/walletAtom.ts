import { WalletStateInterface } from '@/types/wallet.types'
import { atom } from 'jotai'

export const walletStateAtom = atom<WalletStateInterface>({
  status: 'disconnected',
  address: null,
  chainId: null,
  provider: null,
  ensName: null,
  userName: null,
})

export const isWalletPanelOpenAtom = atom<boolean>(false)
