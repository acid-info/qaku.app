import {
  WalletConnectionStatusEnum,
  WalletStateInterface,
} from '@/types/wallet.types'
import { atom } from 'jotai'

export const initialWalletState: WalletStateInterface = {
  status: WalletConnectionStatusEnum.Disconnected,
  address: null,
  chainId: null,
  provider: null,
  ensName: null,
  userName: null,
}

export const walletStateAtom = atom<WalletStateInterface>(initialWalletState)

export const isWalletPanelOpenAtom = atom<boolean>(false)
