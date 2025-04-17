export type QnAType = {
  id: string
  title: string
  description?: string
  hash: string
  owner: string
  hasAdmins: boolean
  admins?: string[]
  allowsParticipantsReplies: boolean
  questionsIds: string[] // TODO-vaclav replace with question counts
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export type MessageType = {
  id: string
  timestamp: Date
  content: string
  author: string
  likesCount: number
  likers: string[]
}

export type QuestionType = MessageType & {
  isAnswered: boolean
  qnaId: string
}

export type AnswerType = MessageType & {
  questionId: string
  qnaId: string
}

export type PollType = {
  id: string
  title: string
  question: string
  description?: string
  qnaId: string
  optionsIds: string[]
  correctAnswersIds?: string[]
  hasCorrectAnswers: boolean
  hasMultipleOptionsSelect: boolean
  isResultVisible: boolean
  activeUntil?: Date
  isActive: boolean
}

export type PollOptionType = {
  id: string
  title: string
  voteCount: number
  voters: string[]
  pollId: string
}

export type PollVoteType = {
  id: string
  optionId: string
  voter: string
  pollId: string
}

export enum QnAFilterTypeEnum {
  All = 'all',
  Active = 'active',
  Past = 'past',
}
