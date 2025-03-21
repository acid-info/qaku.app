import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { getPollByIdAtom } from '@/../atoms/poll'
import { pollsRecordAtom } from '@/../atoms/poll/pollsRecordAtom'
import { usePollSubscriptions } from '@/../hooks/usePollSubscriptions'
import { PollFloatingPanelEdit } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { PollLive } from '@/containers/PollLive/PollLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { poll as pollRoutes } from '@/data/routes'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { updatePoll } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

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

  const handleSavePollSettings = async (
    updatedPollData: Partial<typeof poll>,
  ) => {
    await updatePoll(pollId, updatedPollData)
    setIsSettingsPanelOpen(false)
  }

  const handleShareClick = () => {
    handleShare({
      qnaId: poll.qnaId,
      pollId,
      mode: NavbarModeEnum.Polls,
    })
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
        onAddPollClick: () =>
          router.push(`${pollRoutes.CREATE}?qnaId=${poll.qnaId}`),
        showShareButton: true,
        onShareClick: handleShareClick,
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
