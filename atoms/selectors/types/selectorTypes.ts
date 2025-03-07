import {
  AnswerType,
  PollOptionType,
  PollType,
  QnAType,
  QuestionType,
} from '@/types/qna.types'

export type QnAWithQuestionsType = QnAType & {
  questions: QuestionType[]
}

export type QuestionWithAnswersType = QuestionType & {
  answers: AnswerType[]
}

export type PollWithOptionsType = PollType & {
  options: PollOptionType[]
}

export type CompleteQnAType = QnAType & {
  questions: (QuestionType & {
    answers: AnswerType[]
  })[]
  polls: (PollType & {
    options: PollOptionType[]
  })[]
}
