export type QnAType = {
  id: number
  title: string
  description?: string
  hash: string
  owner: string
  hasAdmins: boolean
  admins?: string[]
  allowsParticipantsReplies: boolean
  questionsIds: number[]
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export type MessageType = {
  id: number
  timestamp: Date
  content: string
  author: string
  likesCount: number
  likers: string[]
}

export type QuestionType = MessageType & {
  isAnswered: boolean
  qnaId: number
}

export type AnswerType = MessageType & {
  questionId: number
  qnaId: number
}

export type PollType = {
  id: number
  title: string
  question: string
  description?: string
  qnaId: number
  optionsIds: number[]
  correctAnswersIds?: number[]
  hasCorrectAnswers: boolean
  hasMultipleOptionsSelect: boolean
  isResultVisible: boolean
  activeUntil?: Date
  isActive: boolean
}

export type PollOptionType = {
  id: number
  title: string
  voteCount: number
  voters: string[]
  pollId: number
}

export type PollVoteType = {
  id: number
  optionId: number
  voter: string
  pollId: number
}

export enum QnAFilterTypeEnum {
  All = 'all',
  Active = 'active',
  Past = 'past',
}
