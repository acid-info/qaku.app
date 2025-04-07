import { getPollByIdAtom } from '@/../atoms/poll'
import { pollOptionsRecordAtom } from '@/../atoms/pollOption'
import { getQnaByIdAtom } from '@/../atoms/qna'
import {
  getPollTotalVotesCountAtom,
  pollWithOptionsAtom,
  qnaCountsByIdAtom,
} from '@/../atoms/selectors'
import { DefaultNavMobileBottomPanel } from '@/components/MobileBottomPanel/DefaultNavMobileBottomPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { PollCreated } from '@/containers/PollCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { HOME, NOT_FOUND } from '@/data/routes'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { deletePoll, loadPollOptions } from '@/utils/api.utils'
import { handleShare } from '@/utils/navbar.utils'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

export const PollPageCreated: React.FC = () => {
  const router = useRouter()
  const id = String(router.query.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  const pollAtom = useMemo(() => {
    if (!id) return atom(null)
    return getPollByIdAtom(id)
  }, [id])

  const poll = useAtomValue(pollAtom)

  const totalVotesCountAtom = useMemo(() => {
    if (!poll) return atom(0)
    return getPollTotalVotesCountAtom(poll.id)
  }, [poll])
  const totalVotesCount = useAtomValue(totalVotesCountAtom)

  const qnaAtom = useMemo(() => {
    if (!poll) return atom(null)
    return getQnaByIdAtom(poll.qnaId)
  }, [poll])
  const qna = useAtomValue(qnaAtom)

  const pollDataAtom = useMemo(() => {
    if (!id) return atom(undefined)
    return pollWithOptionsAtom(id)
  }, [id])
  const pollData = useAtomValue(pollDataAtom)

  const qnaCountsAtom = useMemo(() => {
    if (!poll) return atom(undefined)
    return qnaCountsByIdAtom(poll.qnaId)
  }, [poll])
  const qnaCounts = useAtomValue(qnaCountsAtom)

  const handleShareClick = () => {
    if (!poll) return
    handleShare({
      qnaId: poll.qnaId,
      pollId: id,
      mode: NavbarModeEnum.Polls,
    })
  }

  const handleDeleteClick = async () => {
    if (!poll) return
    try {
      await deletePoll(poll.id)
      router.push(HOME)
    } catch (error) {
      console.error('Failed to delete Poll:', error)
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        await loadPollOptions({ pollId: id, setPollOptionsRecord })
        setIsDataFetched(true)
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

  return (
    <DefaultLayoutContainer
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Polls,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.Ended,
        title: qna?.title,
        startDate: qna?.startDate,
        count: totalVotesCount,
        id: poll?.id.toString(),
        showShareButton: true,
        onShareClick: handleShareClick,
        onDeleteClick: handleDeleteClick,
      }}
    >
      <SEO />
      {pollData && qnaCounts && (
        <PollCreated pollId={id} pollData={pollData} qnaCounts={qnaCounts} />
      )}
      <DefaultNavMobileBottomPanel
        title={qna?.title ?? ''}
        mode={NavbarModeEnum.Polls}
        status={QnaProgressStatusEnum.Ended}
        count={totalVotesCount}
        id={poll?.id.toString() ?? ''}
        startDate={qna?.startDate ?? new Date()}
        showShareButton={true}
        onShareClick={handleShareClick}
        onDeleteClick={handleDeleteClick}
      />
    </DefaultLayoutContainer>
  )
}
