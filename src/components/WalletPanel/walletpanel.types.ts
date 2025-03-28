export type WalletPanelProps = {
  isAuthorized: boolean
  onConnect?: () => void
  onWalletSelect?: (walletType: 'external' | 'qaku') => void
  selectedWallet?: 'external' | 'qaku'
}
