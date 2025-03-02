import { SEO } from '@/components/SEO'
import { PollCreated } from '@/containers/PollCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { getPollByIdAtom } from '../../../atoms/pollAtom'
import { getQnaByIdAtom } from '../../../atoms/qnaAtom'
import { getPollTotalVotesCountAtom } from '../../../atoms/selectors/selectors'

export const PollPageCreated: React.FC = () => {
  const router = useRouter()

  const pollId = useMemo(() => {
    const id = router.query.id
    return typeof id === 'string' ? parseInt(id, 10) : null
  }, [router.query.id])

  const pollAtom = useMemo(() => {
    return pollId !== null ? getPollByIdAtom(pollId) : atom(null)
  }, [pollId])
  const poll = useAtomValue(pollAtom)

  const totalVotesCountAtom = useMemo(() => {
    return poll !== null ? getPollTotalVotesCountAtom(poll.id) : atom(0)
  }, [poll])
  const totalVotesCount = useAtomValue(totalVotesCountAtom)

  const qnaAtom = useMemo(() => {
    return poll !== null ? getQnaByIdAtom(poll.qnaId) : atom(null)
  }, [poll])
  const qna = useAtomValue(qnaAtom)

  if (!router.isReady || pollId === null || !poll || !qna) {
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
      <PollCreated />
    </DefaultLayout>
  )
}
