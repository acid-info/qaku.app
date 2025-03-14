import { PollFloatingPanelEdit } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { PollLive } from '@/containers/PollLive/PollLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'
import { getPollByIdAtom } from '../../../atoms/poll'
import { pollsRecordAtom } from '../../../atoms/poll/pollsRecordAtom'
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

  const setPollsRecord = useSetAtom(pollsRecordAtom)

  const pollAtom = useMemo(() => {
    if (!pollId) return atom(null)
    return getPollByIdAtom(pollId)
  }, [pollId])

  const poll = useAtomValue(pollAtom)

  usePollSubscriptions(pollId)

  if (!router.isReady || !pollId || !poll) {
    return null
  }

  const handleSavePollSettings = (updatedPollData: Partial<typeof poll>) => {
    setPollsRecord((prev) => ({
      ...prev,
      [pollId]: {
        ...prev[pollId],
        ...updatedPollData,
      },
    }))
    setIsSettingsPanelOpen(false)
  }

  return (
    <DefaultLayoutContainer
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
        onAddPollClick: () => router.push(`/poll/create?qnaId=${poll.qnaId}`),
      }}
    >
      <SEO />
      <PollLive pollId={pollId} poll={poll} />
      <PollFloatingPanelEdit
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        poll={poll}
        onSave={handleSavePollSettings}
      />
    </DefaultLayoutContainer>
  )
}
