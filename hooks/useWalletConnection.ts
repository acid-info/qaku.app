import {
  isWalletPanelOpenAtom,
  walletStateAtom,
} from '@/../atoms/wallet/walletAtom'
import { WAGMI_CONNECTORS } from '@/configs/wagmi.config'
import { WalletProviderEnum, WalletStateInterface } from '@/types/wallet.types'
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect,
  useWalletInfo,
} from '@reown/appkit/react'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { useConnect as useWagmiConnect } from 'wagmi'

export const useWalletConnection = () => {
  const [walletState, setWalletState] = useAtom(walletStateAtom)
  const [isWalletPanelOpen, setIsWalletPanelOpen] = useAtom(
    isWalletPanelOpenAtom,
  )
  const [ensName, setEnsName] = useState<string | null>(null)

  const appKit = useAppKit()
  const { address, isConnected, status } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()
  const { disconnect } = useDisconnect()
  const { walletInfo } = useWalletInfo()
  const { connect: wagmiConnect } = useWagmiConnect()

  const openWalletPanel = useCallback(() => {
    setIsWalletPanelOpen(true)
  }, [setIsWalletPanelOpen])

  const closeWalletPanel = useCallback(() => {
    setIsWalletPanelOpen(false)
  }, [setIsWalletPanelOpen])

  const resetWalletState = useCallback(() => {
    setWalletState({
      status: 'disconnected',
      address: null,
      chainId: null,
      provider: null,
      ensName: null,
      userName: null,
    })
  }, [setWalletState])

  const connectWallet = useCallback(
    async (providerId: WalletProviderEnum) => {
      try {
        setWalletState((prev: WalletStateInterface) => ({
          ...prev,
          status: 'connecting',
          provider: providerId,
        }))

        switch (providerId) {
          case WalletProviderEnum.MetaMask:
          case WalletProviderEnum.CoinbaseWallet:
            wagmiConnect({
              connector: WAGMI_CONNECTORS[providerId],
            })
            break

          case WalletProviderEnum.WalletConnect:
            appKit.open({
              view: 'Connect',
              namespace: 'eip155',
            })
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error)
        setWalletState((prev: WalletStateInterface) => ({
          ...prev,
          status: 'error',
        }))
        closeWalletPanel()
      }
    },
    [appKit, setWalletState, closeWalletPanel],
  )

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect()
      await appKit.close()

      setEnsName(null)
      resetWalletState()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }, [appKit, disconnect, resetWalletState])

  // TODO: Implement ENS name resolution
  const fetchEnsName = useCallback(() => {
    setEnsName(null)
  }, [setEnsName])

  // Update wallet state when connection changes
  useEffect(() => {
    const updateWalletState = async () => {
      if (isConnected && address) {
        await fetchEnsName()

        setWalletState({
          status: status === 'connected' ? 'connected' : 'connecting',
          address,
          chainId: typeof chainId === 'number' ? chainId : null,
          provider: walletState.provider,
          ensName,
          userName: ensName ?? address,
        })
      } else if (!isConnected) {
        setEnsName(null)
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
    fetchEnsName,
    setWalletState,
    resetWalletState,
    walletState.provider,
  ])

  const walletDetails = {
    name: walletInfo?.name || null,
    icon: walletInfo?.icon || null,
    type: walletInfo?.type || null,
  }

  return {
    walletState,
    isWalletPanelOpen,
    openWalletPanel,
    closeWalletPanel,
    connectWallet,
    disconnectWallet,
    walletDetails,
  }
}
