import { FilterThreadEnum, ThreadInterface } from '@/types/thread.types'
import { QuestionWithAnswersType } from '../../atoms'

export const mapQuestionToThread = (
  question: QuestionWithAnswersType,
  currentUser: string,
): ThreadInterface => ({
  info: {
    author: question.author,
    timestamp: question.timestamp.toISOString(),
    question: question.content,
    isAnswered: question.isAnswered,
    questionId: question.id,
    responses: question.answers.map((answer) => ({
      id: answer.id,
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

export const getFilteredQuestions = (
  activeFilter: FilterThreadEnum,
  {
    allQuestions,
    answeredQuestions,
    unansweredQuestions,
    popularQuestions,
  }: {
    allQuestions: QuestionWithAnswersType[]
    answeredQuestions: QuestionWithAnswersType[]
    unansweredQuestions: QuestionWithAnswersType[]
    popularQuestions: QuestionWithAnswersType[]
  },
): QuestionWithAnswersType[] => {
  switch (activeFilter) {
    case FilterThreadEnum.All:
      return unansweredQuestions
    case FilterThreadEnum.Popular:
      return popularQuestions
    case FilterThreadEnum.Answered:
      return answeredQuestions
    default:
      return allQuestions
  }
}
