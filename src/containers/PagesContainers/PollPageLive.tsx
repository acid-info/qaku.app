import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { getPollByIdAtom } from '@/../atoms/poll'
import { pollOptionsRecordAtom } from '@/../atoms/pollOption'
import { usePollSubscriptions } from '@/../hooks/usePollSubscriptions'
import { PollFloatingPanelEdit } from '@/components/FloatingPanel'
import { DefaultNavMobileBottomPanel } from '@/components/MobileBottomPanel/DefaultNavMobileBottomPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { PollLive } from '@/containers/PollLive/PollLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { NOT_FOUND, POLL as pollRoutes } from '@/data/routes'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { endPoll, loadPollOptions, updatePoll } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

export const PollPageLive: React.FC = () => {
  const router = useRouter()
  const id = String(router.query.id)
  const qnaId = String(router.query.qnaId)

  const [isLoading, setIsLoading] = useState(true)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )

  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  const pollAtom = useMemo(() => {
    if (!id) return atom(null)
    return getPollByIdAtom(id)
  }, [id])

  const poll = useAtomValue(pollAtom)

  usePollSubscriptions(qnaId, id)

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        console.log('Q&A Id in polls ', qnaId)
        await loadPollOptions({ qnaId, pollId: id, setPollOptionsRecord })
        //setIsDataFetched(true)
        setIsLoading(false)
      } catch (_) {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router.isReady, id, setPollOptionsRecord])

  useEffect(() => {
    if (!router.isReady || id == null) return
    if (isDataFetched && !isLoading && !poll) {
      router.push(NOT_FOUND)
    }
  }, [router, id, poll, isLoading, isDataFetched])

  const handleSavePollSettings = async (
    updatedPollData: Partial<typeof poll>,
  ) => {
    if (!updatedPollData) return
    await updatePoll(id, updatedPollData)
    setIsSettingsPanelOpen(false)
  }

  const handleShareClick = () => {
    if (!poll) return
    handleShare({
      qnaId: poll.qnaId,
      pollId: id,
      mode: NavbarModeEnum.Polls,
    })
  }

  const handleEndClick = async () => {
    const response = await endPoll(id)
    if (!response.success) {
      console.error('Failed to end Poll:', response.error)
    } else {
      router.push(pollRoutes.CREATED.replace(':id', id.toString()))
    }
  }

  const handleAddPollClick = () => {
    if (!poll) return
    router.push(`${pollRoutes.CREATE}?qnaId=${poll.qnaId}`)
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
        title: poll?.title,
        startDate: new Date(),
        count: poll?.optionsIds.length,
        id: id.toString(),
        showSettingsButton: true,
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: handleAddPollClick,
        showShareButton: true,
        onShareClick: handleShareClick,
        onEndClick: handleEndClick,
      }}
    >
      <SEO />
      {poll != null && (
        <>
          <PollLive pollId={id} poll={poll} />
          <PollFloatingPanelEdit
            isOpen={isSettingsPanelOpen}
            onClose={() => setIsSettingsPanelOpen(false)}
            poll={poll}
            onSave={handleSavePollSettings}
          />
        </>
      )}
      <DefaultNavMobileBottomPanel
        title={poll?.title ?? ''}
        mode={NavbarModeEnum.Polls}
        status={QnaProgressStatusEnum.InProgress}
        count={poll?.optionsIds.length ?? 0}
        id={id.toString()}
        startDate={new Date()}
        showSettingsButton={true}
        onSettingsClick={() => setIsSettingsPanelOpen(true)}
        onAddPollClick={handleAddPollClick}
        showShareButton={true}
        onShareClick={handleShareClick}
        onEndClick={handleEndClick}
      />
    </DefaultLayoutContainer>
  )
}
