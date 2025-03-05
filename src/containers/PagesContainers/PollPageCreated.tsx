import { SEO } from '@/components/SEO'
import { PollCreated } from '@/containers/PollCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { loadPollOptions } from '@/utils/api.utils'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { getPollByIdAtom } from '../../../atoms/pollAtom'
import { pollOptionsRecordAtom } from '../../../atoms/pollOptionAtom'
import { getQnaByIdAtom } from '../../../atoms/qnaAtom'
import {
  pollWithOptionsAtom,
  qnaCountsByIdAtom,
} from '../../../atoms/selectors'
import { getPollTotalVotesCountAtom } from '../../../atoms/selectors/selectors'

export const PollPageCreated: React.FC = () => {
  const router = useRouter()
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  const pollId = useMemo(() => {
    const id = router.query.id
    return parseInt(String(id), 10)
  }, [router.query.id])

  useEffect(() => {
    if (!pollId) return
    loadPollOptions(pollId, setPollOptionsRecord)
  }, [pollId, setPollOptionsRecord])

  const pollAtom = useMemo(() => {
    if (!pollId) return atom(null)
    return getPollByIdAtom(pollId)
  }, [pollId])
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
    if (!pollId) return atom(undefined)
    return pollWithOptionsAtom(pollId)
  }, [pollId])
  const pollData = useAtomValue(pollDataAtom)

  const qnaCountsAtom = useMemo(() => {
    if (!poll) return atom(undefined)
    return qnaCountsByIdAtom(poll.qnaId)
  }, [poll])
  const qnaCounts = useAtomValue(qnaCountsAtom)

  if (!router.isReady || !pollId || !poll || !qna || !pollData || !qnaCounts) {
    return null
  }

  return (
    <DefaultLayout
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Polls,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.Ended,
        title: qna.title,
        date: qna.startDate.toISOString(),
        count: totalVotesCount,
        id: poll.id.toString(),
      }}
    >
      <SEO />
      <PollCreated pollId={pollId} pollData={pollData} qnaCounts={qnaCounts} />
    </DefaultLayout>
  )
}
