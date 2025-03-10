import { Sidebar } from '@/components/Sidebar/Sidebar'
import { PollType, QnAType } from '@/types/qna.types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import {
  activeObjectAtom,
  expandedQnAIdsAtom,
  filteredQnAIdsAtom,
  pollsRecordAtom,
  qnaFilterAtom,
  qnaStatsAtom,
  qnasRecordAtom,
  setActivePollAtom,
  setActiveQnAAtom,
  toggleExpandedQnAAtom,
} from '../../../atoms'

export const SidebarContainer: React.FC = () => {
  const router = useRouter()
  const [filter, setFilter] = useAtom(qnaFilterAtom)

  const activeObject = useAtomValue(activeObjectAtom)
  const expandedQnAIds = useAtomValue(expandedQnAIdsAtom)
  const setActiveQnA = useSetAtom(setActiveQnAAtom)
  const setActivePoll = useSetAtom(setActivePollAtom)
  const toggleExpandedQnA = useSetAtom(toggleExpandedQnAAtom)

  const filteredQnAIds = useAtomValue(filteredQnAIdsAtom)
  const qnasRecord = useAtomValue(qnasRecordAtom)
  const pollsRecord = useAtomValue(pollsRecordAtom)
  const stats = useAtomValue(qnaStatsAtom)

  const sidebarStats = useMemo(
    () => ({
      all: stats.total,
      active: stats.active,
    }),
    [stats],
  )

  const filteredQnAs = useMemo(() => {
    return filteredQnAIds.map((id) => {
      const qna = qnasRecord[id]
      const polls = Object.values(pollsRecord).filter(
        (poll) => poll.qnaId === id,
      )

      return {
        ...qna,
        polls,
      } as QnAType & { polls: PollType[] }
    })
  }, [filteredQnAIds, qnasRecord, pollsRecord])

  const handleQnAClick = (qnaId: number) => {
    setActiveQnA(qnaId)
    const qna = qnasRecord[qnaId]
    if (qna?.isActive) {
      router.push(`/qna/live/${qnaId}`)
    } else {
      router.push(`/qna/created/${qnaId}`)
    }
  }

  const handlePollClick = (pollId: number) => {
    setActivePoll(pollId)
    const poll = pollsRecord[pollId]
    if (poll?.isActive) {
      router.push(`/poll/live/${pollId}`)
    } else {
      router.push(`/poll/created/${pollId}`)
    }
  }

  const handleHeaderClick = (qnaId: number) => {
    toggleExpandedQnA(qnaId)
  }

  const handleSearch = (query: string) => {
    // TODO implement search
  }

  const handleStatusFilterChange = (value: string | number) => {
    // TODO implement status filter
  }

  const activeItemId = activeObject.id ?? undefined

  return (
    <Sidebar
      filteredQnAs={filteredQnAs}
      stats={sidebarStats}
      filter={filter}
      activeItemId={activeItemId}
      expandedQnAIds={expandedQnAIds}
      onFilterChange={setFilter}
      onQnAClick={handleQnAClick}
      onPollClick={handlePollClick}
      onHeaderClick={handleHeaderClick}
      onSearch={handleSearch}
      onStatusFilterChange={handleStatusFilterChange}
    />
  )
}
