import { WalletStateInterface } from '@/types/wallet.types'
import { atom } from 'jotai'

export const initialWalletState: WalletStateInterface = {
  status: 'disconnected',
  address: null,
  chainId: null,
  provider: null,
  ensName: null,
  userName: null,
}

export const walletStateAtom = atom<WalletStateInterface>(initialWalletState)

export const isWalletPanelOpenAtom = atom<boolean>(false)
