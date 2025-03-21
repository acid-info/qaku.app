import {
  WalletConnectionStatusEnum,
  WalletStateInterface,
} from '@/types/wallet.types'
import { atom } from 'jotai'

export const initialWalletState: WalletStateInterface = {
  status: WalletConnectionStatusEnum.Disconnected,
  address: '0xDefaultAddress',
  chainId: null,
  provider: null,
  ensName: null,
  userName: '0xDefaultAddress',
}

export const walletStateAtom = atom<WalletStateInterface>(initialWalletState)

export const isWalletPanelOpenAtom = atom<boolean>(false)
