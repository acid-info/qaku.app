import { pollSettingsAtom } from '@/../atoms/settings'
import { PollFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { PollLive } from '@/containers/PollLive/PollLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'
import { getPollByIdAtom } from '../../../atoms/pollAtom'
import { usePollSubscriptions } from '../../../hooks/usePollSubscriptions'

export const PollPageLive: React.FC = () => {
  const router = useRouter()

  const pollId = useMemo(() => {
    const id = router.query.id
    return parseInt(String(id), 10)
  }, [router.query.id])

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [pollSettings, setPollSettings] = useAtom(pollSettingsAtom)

  const pollAtom = useMemo(() => {
    if (!pollId) return atom(null)
    return getPollByIdAtom(pollId)
  }, [pollId])

  const poll = useAtomValue(pollAtom)

  usePollSubscriptions(pollId)

  if (!router.isReady || !pollId || !poll) {
    return null
  }

  return (
    <DefaultLayout
      useAlternativeGap
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Polls,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.InProgress,
        title: poll.title,
        date: new Date().toISOString(),
        count: poll.optionsIds.length,
        id: pollId.toString(),
        onSettingsClick: () => setIsSettingsPanelOpen(true),
      }}
    >
      <SEO />
      <PollLive pollId={pollId} poll={poll} />
      <PollFloatingPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        initialValues={pollSettings}
        onSave={(values) => {
          setPollSettings(values)
          setIsSettingsPanelOpen(false)
        }}
      />
    </DefaultLayout>
  )
}
