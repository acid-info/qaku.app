import { PollOptionType } from '@/types/qna.types'
import { getValidPercentage } from './general.utils'

// Calculates the percentage of votes for a given poll option based on total votes
export const calculateOptionPercentage = ({
  option,
  totalVotes,
}: {
  option: PollOptionType
  totalVotes: number
}): number => {
  if (totalVotes === 0) return 0
  const percentage = Math.round((option.voteCount / totalVotes) * 100)
  return getValidPercentage(percentage)
}

// Calculates the total number of votes in a poll
export const calculateTotalVotes = (options: PollOptionType[]): number => {
  return options.reduce((total, option) => total + option.voteCount, 0)
}

export type MappedPollOption = {
  id: string
  title: string
  percentage: number
  isChecked: boolean
}

export const mapPollOptionsForDisplay = ({
  optionsWithStats,
  hasCorrectAnswers = false,
  correctAnswersIds,
}: {
  optionsWithStats: Array<PollOptionType & { percentage: number }>
  hasCorrectAnswers: boolean
  correctAnswersIds?: number[]
}): MappedPollOption[] => {
  return optionsWithStats.map((option) => ({
    id: option.id.toString(),
    title: option.title,
    percentage: option.percentage,
    isChecked:
      (hasCorrectAnswers && correctAnswersIds?.includes(option.id)) || false,
  }))
}
