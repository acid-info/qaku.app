import { QakuInfo, WakuContext } from '@/contexts/WakuContextProvider'
import { useContext, useMemo } from 'react'

export const useQaku = () => {
  const wakuContext = useContext(WakuContext)

  if (!wakuContext) {
    throw new Error('WakuContext at a wrong level')
  }
  const { providerInfo } = wakuContext
  return useMemo<QakuInfo>(() => {
    return { ...providerInfo }
  }, [wakuContext])
}
