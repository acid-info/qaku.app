import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { pollsRecordAtom } from '../atoms/pollAtom'

// Hook for accessing polls data for a specific QnA
export const useQnaPolls = (qnaId: number) => {
  const pollsRecord = useAtomValue(pollsRecordAtom)

  const qnaPolls = useMemo(() => {
    return Object.values(pollsRecord).filter((poll) => poll.qnaId === qnaId)
  }, [pollsRecord, qnaId])

  const activePolls = useMemo(() => {
    return qnaPolls.filter((poll) => poll.isActive)
  }, [qnaPolls])

  const inactivePolls = useMemo(() => {
    return qnaPolls.filter((poll) => !poll.isActive)
  }, [qnaPolls])

  return {
    polls: qnaPolls,
    activePolls,
    inactivePolls,
    pollsCount: qnaPolls.length,
    activePollsCount: activePolls.length,
    inactivePollsCount: inactivePolls.length,
    hasPolls: qnaPolls.length > 0,
    hasActivePolls: activePolls.length > 0,
  }
}
