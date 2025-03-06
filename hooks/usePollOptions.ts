import {
  calculateOptionPercentage,
  calculateTotalVotes,
} from '@/utils/poll.utils'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { pollOptionsRecordAtom } from '../atoms/pollOptionAtom'

// Hook for accessing poll options data for a specific poll
export const usePollOptions = (pollId: number) => {
  const pollOptionsRecord = useAtomValue(pollOptionsRecordAtom)

  const pollOptions = useMemo(() => {
    return Object.values(pollOptionsRecord).filter(
      (option) => option.pollId === pollId,
    )
  }, [pollOptionsRecord, pollId])

  const totalVotes = useMemo(() => {
    return calculateTotalVotes(pollOptions)
  }, [pollOptions])

  const optionsWithStats = useMemo(() => {
    return pollOptions.map((option) => ({
      ...option,
      percentage: calculateOptionPercentage({ option, totalVotes }),
    }))
  }, [pollOptions, totalVotes])

  const hasVoted = (userId: string) => {
    return pollOptions.some((option) => option.voters.includes(userId))
  }

  return {
    options: pollOptions,
    optionsWithStats,
    totalVotes,
    hasOptions: pollOptions.length > 0,
    hasVoted,
  }
}
