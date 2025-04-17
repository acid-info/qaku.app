import { QnaProgressStatusEnum } from '@/types/navbar.types'
import { AnswerType, QnAType, QuestionType } from '@/types/qna.types'

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

export const handleQnAUpdateInState = ({
  qna,
  setQnasRecord,
}: {
  qna: QnAType
  setQnasRecord: (
    updater: (prev: Record<string, QnAType>) => Record<string, QnAType>,
  ) => void
}): void => {
  setQnasRecord((prev) => ({
    ...prev,
    [qna.id]: qna,
  }))
}

export const handleQnADeleteInState = ({
  qnaId,
  setQnasRecord,
  setQuestionsRecord,
  setAnswersRecord,
}: {
  qnaId: string
  setQnasRecord: (
    updater: (prev: Record<string, QnAType>) => Record<string, QnAType>,
  ) => void
  setQuestionsRecord: (
    updater: (
      prev: Record<string, QuestionType>,
    ) => Record<string, QuestionType>,
  ) => void
  setAnswersRecord: (
    updater: (prev: Record<string, AnswerType>) => Record<string, AnswerType>,
  ) => void
}): void => {
  setQnasRecord((prev) => {
    const newRecord = { ...prev }
    delete newRecord[qnaId]
    return newRecord
  })

  // Clean up related questions
  setQuestionsRecord((prev) => {
    const newRecord = { ...prev }
    Object.values(newRecord).forEach((question) => {
      if (question.qnaId === qnaId) {
        delete newRecord[question.id]
      }
    })
    return newRecord
  })

  // Clean up related answers
  setAnswersRecord((prev) => {
    const newRecord = { ...prev }
    Object.values(newRecord).forEach((answer) => {
      if (answer.qnaId === qnaId) {
        delete newRecord[answer.id]
      }
    })
    return newRecord
  })
}

export const getQnaProgressStatus = (qna: QnAType) => {
  return new Date(qna.startDate) > new Date()
    ? QnaProgressStatusEnum.BeforeStart
    : QnaProgressStatusEnum.Ended
}
