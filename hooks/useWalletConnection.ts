import {
  initialWalletState,
  isWalletPanelOpenAtom,
  walletStateAtom,
} from '@/../atoms/wallet/walletAtom'
import { WAGMI_CONNECTORS } from '@/configs/wagmi.config'
import {
  WalletConnectionStatusEnum,
  WalletProviderEnum,
  WalletStateInterface,
} from '@/types/wallet.types'
import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'

export const useWalletConnection = () => {
  const [walletState, setWalletState] = useAtom(walletStateAtom)
  const [isWalletPanelOpen, setIsWalletPanelOpen] = useAtom(
    isWalletPanelOpenAtom,
  )

  const { address, isConnected, status, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect()
  const { data: ensName } = useEnsName({ address })

  const openWalletPanel = useCallback(() => {
    setIsWalletPanelOpen(true)
  }, [setIsWalletPanelOpen])

  const closeWalletPanel = useCallback(() => {
    setIsWalletPanelOpen(false)
  }, [setIsWalletPanelOpen])

  const resetWalletState = useCallback(() => {
    setWalletState(initialWalletState)
  }, [setWalletState])

  const connectWallet = useCallback(
    async (providerId: WalletProviderEnum) => {
      try {
        setWalletState((prev: WalletStateInterface) => ({
          ...prev,
          status: WalletConnectionStatusEnum.Connecting,
          provider: providerId,
        }))

        switch (providerId) {
          case WalletProviderEnum.MetaMask:
          case WalletProviderEnum.CoinbaseWallet:
            connect({
              connector: WAGMI_CONNECTORS[providerId],
            })
            break
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error)
        setWalletState((prev: WalletStateInterface) => ({
          ...prev,
          status: WalletConnectionStatusEnum.Error,
        }))
        closeWalletPanel()
      }
    },
    [setWalletState, closeWalletPanel],
  )

  const disconnectWallet = useCallback(async () => {
    try {
      disconnect()
      resetWalletState()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }, [disconnect, resetWalletState])

  // Update wallet state when connection changes
  useEffect(() => {
    const updateWalletState = async () => {
      if (isConnected && address) {
        setWalletState({
          status:
            status === 'connected'
              ? WalletConnectionStatusEnum.Connected
              : WalletConnectionStatusEnum.Connecting,
          address,
          chainId: chainId ?? null,
          provider: walletState.provider,
          ensName: ensName ?? null,
          userName: ensName ?? address,
        })
      } else if (!isConnected) {
        resetWalletState()
      }
    }

    updateWalletState()
  }, [
    isConnected,
    address,
    chainId,
    status,
    ensName,
    setWalletState,
    resetWalletState,
    walletState.provider,
  ])

  return {
    walletState,
    isWalletPanelOpen,
    openWalletPanel,
    closeWalletPanel,
    connectWallet,
    disconnectWallet,
  }
}
