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
  correctAnswersIds?: string[]
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
  question: string
  description?: string
  qnaId: string
  correctAnswers: string[]
  markCorrectAnswer: boolean
  multipleOptions: boolean
  resultVisibility: ResultVisibilityEnum
  options: MappedPollOption[]
}

export const mapPollDataForCreation = ({
  title,
  question,
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
    question,
    description,
    qnaId: String(qnaId),
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

export const handlePollUpdateInState = ({
  poll,
  setPollsRecord,
}: {
  poll: PollType
  setPollsRecord: (
    updater: (prev: Record<string, PollType>) => Record<string, PollType>,
  ) => void
}): void => {
  setPollsRecord((prev) => ({
    ...prev,
    [poll.id]: poll,
  }))
}

export const handlePollDeleteInState = ({
  pollId,
  setPollsRecord,
  setPollOptionsRecord,
}: {
  pollId: string
  setPollsRecord: (
    updater: (prev: Record<string, PollType>) => Record<string, PollType>,
  ) => void
  setPollOptionsRecord: (
    updater: (
      prev: Record<string, PollOptionType>,
    ) => Record<string, PollOptionType>,
  ) => void
}): void => {
  setPollsRecord((prev) => {
    const newRecord = { ...prev }
    delete newRecord[pollId]
    return newRecord
  })

  // Clean up related poll options
  setPollOptionsRecord((prevOptions) => {
    const newOptions = { ...prevOptions }
    Object.keys(newOptions).forEach((optionId) => {
      const id = String(optionId)
      if (newOptions[id]?.pollId === pollId) {
        delete newOptions[id]
      }
    })
    return newOptions
  })
}
