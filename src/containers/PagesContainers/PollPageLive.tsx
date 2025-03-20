import { PollFloatingPanelEdit } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { PollLive } from '@/containers/PollLive/PollLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { updatePoll } from '@/utils/api.utils'
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

  const handleSavePollSettings = async (
    updatedPollData: Partial<typeof poll>,
  ) => {
    await updatePoll(pollId, updatedPollData)
    setIsSettingsPanelOpen(false)
  }

  const handleShareClick = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const baseUrl = `${url.protocol}//${url.host}`
      const shareUrl = `${baseUrl}/user/qna/${poll.qnaId}/polls?poll=${pollId}`

      navigator.clipboard
        .writeText(shareUrl)
        .then(() => alert('Share link to user poll view copied to clipboard!'))
        .catch((err) => console.error('Failed to copy link:', err))
    }
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
        onAddPollClick: () => router.push(`/poll/create?qnaId=${poll.qnaId}`),
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
    </DefaultLayout>
  )
}
