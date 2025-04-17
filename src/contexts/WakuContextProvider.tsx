import { initQA, initializeQaku } from '@/lib/api/qakulib/handlers'
import { HealthStatus } from '@waku/interfaces'
import { Qaku, QakuEvents } from 'qakulib'
import React, { useContext, useEffect, useMemo, useState } from 'react'

// TODO-vaclav remove?
export type QakuInfo = {
  needsRefresh: number
  status: string
  connected: boolean
  health: HealthStatus
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

  useEffect(() => {
    if (connected || connecting) return
    ;(async () => {
      setConnecting(true)
      const qaku = await initializeQaku()
      qaku.on(QakuEvents.NEW_QUESTION, () => setNeedsRefresh((i) => i++))
      qaku.on(QakuEvents.NEW_ANSWER, () => setNeedsRefresh((i) => i++))
      qaku.on(QakuEvents.NEW_MODERATION, () => setNeedsRefresh((i) => i++))
      qaku.on(QakuEvents.NEW_UPVOTE, () => setNeedsRefresh((i) => i++))
      qaku.on(QakuEvents.NEW_CONTROL_MESSAGE, () => setNeedsRefresh((i) => i++))
      setQaku(qaku)

      setConnecting(false)
      setConnected(true)
      setStatus('connected')
    })()

    return () => {
      if (!qaku) return
      console.log('Clearing Qaku listeners')
      qaku.off(QakuEvents.NEW_QUESTION, () => setNeedsRefresh((i) => i++))
      qaku.off(QakuEvents.NEW_ANSWER, () => setNeedsRefresh((i) => i++))
      qaku.off(QakuEvents.NEW_MODERATION, () => setNeedsRefresh((i) => i++))
      qaku.off(QakuEvents.NEW_UPVOTE, () => setNeedsRefresh((i) => i++))
      qaku.off(QakuEvents.NEW_CONTROL_MESSAGE, () =>
        setNeedsRefresh((i) => i++),
      )
    }
  }, [connecting])

  useEffect(() => {
    ;(async () => {
      console.log('Initialized: ', connected)

      if (connected && qaId !== undefined) console.log('Qakulib initalized!!')
      await initQA(qaId, password)
      console.log('QA initialized')
    })()
  }, [connected])

  const wakuInfo = useMemo(
    () => ({
      needsRefresh,
      status,
      connected,
      health,
    }),
    [needsRefresh, status, connected, health],
  )

  return (
    <WakuContext.Provider value={{ providerInfo: wakuInfo }}>
      {children}
    </WakuContext.Provider>
  )
}
