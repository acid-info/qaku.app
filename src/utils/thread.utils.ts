import { FilterThreadEnum, ThreadInterface } from '@/types/thread.types'
import { QuestionWithAnswersType } from '../../atoms'

export const mapQuestionToThread = (
  question: QuestionWithAnswersType,
  // TODO: Get from user atom
  currentUser = 'currentUser',
): ThreadInterface => ({
  info: {
    author: question.author,
    timestamp: question.timestamp.toISOString(),
    question: question.content,
    isAnswered: question.isAnswered,
    responses: question.answers.map((answer) => ({
      info: {
        author: answer.author,
        timestamp: answer.timestamp.toISOString(),
        response: answer.content,
      },
      likes: {
        count: answer.likesCount,
        isLiked: answer.likers.includes(currentUser),
      },
    })),
  },
  likes: {
    count: question.likesCount,
    isLiked: question.likers.includes(currentUser),
  },
})

export const filterQuestions = (
  questions: QuestionWithAnswersType[],
  filter: FilterThreadEnum,
): QuestionWithAnswersType[] => {
  switch (filter) {
    case FilterThreadEnum.All:
      return questions.filter((question) => !question.isAnswered)
    case FilterThreadEnum.Popular:
      return questions.filter((question) => question.answers.length >= 2)
    case FilterThreadEnum.Answered:
      return questions.filter((question) => question.isAnswered)
    default:
      return questions
  }
}
