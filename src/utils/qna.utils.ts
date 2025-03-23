import { mockQuestions } from '@/data/mockQuestions'
import { AnswerType, QuestionType } from '@/types/qna.types'

export const countUniqueNamedAuthors = (
  questions: QuestionType[],
  answers: AnswerType[],
): number => {
  const uniqueNamedAuthors = new Set<string>()

  questions.forEach((question) => {
    if (question?.author && question.author !== 'Anonymous') {
      uniqueNamedAuthors.add(question.author)
    }
  })

  answers.forEach((answer) => {
    if (answer?.author && answer.author !== 'Anonymous') {
      uniqueNamedAuthors.add(answer.author)
    }
  })

  return uniqueNamedAuthors.size
}

export const calculateQnAStats = (
  questions: QuestionType[],
  answers: AnswerType[],
) => {
  const questionsCount = questions.length
  const uniqueNamedAuthorsCount = countUniqueNamedAuthors(questions, answers)
  const totalContributions = questionsCount + answers.length

  const anonymousRate =
    totalContributions > 0
      ? Math.round(
          ((totalContributions - uniqueNamedAuthorsCount) /
            totalContributions) *
            100,
        )
      : 0

  return {
    questionsCount,
    namedAuthorCount: uniqueNamedAuthorsCount,
    anonymousRate,
  }
}

export const checkValidQnA = (id: number) =>
  mockQuestions.some((q) => q.id === id)
