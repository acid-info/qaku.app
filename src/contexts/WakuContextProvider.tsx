import { initializeQaku } from '@/lib/api/qakulib/handlers'
import { HealthStatus } from '@waku/interfaces'
import { useAtom } from 'jotai'
import { Qaku } from 'qakulib'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { loadingAtom } from '../../atoms'

// TODO-vaclav remove?
export type QakuInfo = {
  needsRefresh: number
  status: string
  connected: boolean
  health: HealthStatus
  qaku: Qaku | null
}

export type WakuContextData = {
  providerInfo: QakuInfo
} | null

export const WakuContext = React.createContext<WakuContextData>(null)

export const useWakuContext = () => {
  const wakuContext = useContext(WakuContext)

  if (!wakuContext) {
    throw new Error('WakuContext at a wrong level')
  }
  const { providerInfo } = wakuContext
  return useMemo<QakuInfo>(() => {
    return { ...providerInfo }
  }, [wakuContext])
}

interface Props {
  qaId: string
  password: string
  updateStatus: (msg: string, typ: string, delay?: number) => void
  children: React.ReactNode
}

export const WakuContextProvider = ({
  children,
  updateStatus,
  qaId,
  password,
}: Props) => {
  const [status, setStatus] = useState<string>('disconnected')
  const [connected, setConnected] = useState<boolean>(false)
  const [connecting, setConnecting] = useState<boolean>(false)
  const [health, setHealth] = useState<HealthStatus>(HealthStatus.Unhealthy)
  const [needsRefresh, setNeedsRefresh] = useState<number>(0)
  const [qaku, setQaku] = useState<Qaku | null>(null)
  const [loadingState, setLoadingState] = useAtom(loadingAtom)

  useEffect(() => {
    if (connected || connecting) return
    ;(async () => {
      setLoadingState({ isLoading: true })
      setConnecting(true)
      const qaku = await initializeQaku()
      setQaku(qaku)

      setConnecting(false)
      setConnected(true)
      setLoadingState({ isLoading: false })
      setStatus('connected')
    })()

    return () => {}
  }, [connecting])

  const wakuInfo = useMemo(
    () => ({
      needsRefresh,
      status,
      connected,
      health,
      qaku,
    }),
    [needsRefresh, status, connected, health, qaku],
  )

  return (
    <WakuContext.Provider value={{ providerInfo: wakuInfo }}>
      {children}
    </WakuContext.Provider>
  )
}
