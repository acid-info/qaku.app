import { mockPolls } from '@/data/mockPolls'
import { PollOptionType, PollType } from '@/types/qna.types'
import { ResultVisibilityEnum } from '@/types/settings.types'
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

export type PollCreationData = {
  title: string
  description?: string
  qnaId: number
  correctAnswers: string[]
  markCorrectAnswer: boolean
  multipleOptions: boolean
  resultVisibility: ResultVisibilityEnum
  options: MappedPollOption[]
}

export const mapPollDataForCreation = ({
  title,
  description,
  qnaId,
  correctAnswers,
  markCorrectAnswer,
  multipleOptions,
  resultVisibility,
  options,
}: PollCreationData): {
  pollData: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'>
  pollOptions: { title: string; isCorrectAnswer?: boolean }[]
} => {
  const pollData: Omit<PollType, 'id' | 'optionsIds' | 'correctAnswersIds'> = {
    title,
    question: title,
    description,
    qnaId: Number(qnaId),
    hasCorrectAnswers: markCorrectAnswer,
    hasMultipleOptionsSelect: multipleOptions,
    isResultVisible: resultVisibility === ResultVisibilityEnum.Visible,
    isActive: true,
  }

  const pollOptions = options.map((option) => ({
    title: option.title,
    isCorrectAnswer: markCorrectAnswer
      ? correctAnswers.includes(option.id)
      : undefined,
  }))

  return { pollData, pollOptions }
}

export const checkValidPoll = (id: number) => mockPolls.some((q) => q.id === id)
