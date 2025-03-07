import { atom } from 'jotai'
import { answerIdsByQuestionIdAtom } from '../answer/answerIdsByQuestionIdAtom'
import { answersRecordAtom } from '../answer/answersRecordAtom'
import { questionIdsByQnaIdAtom } from '../question/questionIdsByQnaIdAtom'
import { questionsRecordAtom } from '../question/questionsRecordAtom'

export const allQuestionsWithAnswersForQnAAtom = (qnaId: number) =>
  atom((get) => {
    const questionIds = get(questionIdsByQnaIdAtom(qnaId))
    const questionsRecord = get(questionsRecordAtom)
    const answersRecord = get(answersRecordAtom)

    return questionIds.map((questionId) => {
      const question = questionsRecord[questionId]
      const answerIds = get(answerIdsByQuestionIdAtom(questionId))
      const answers = answerIds.map((id) => answersRecord[id])

      return {
        ...question,
        answers,
      }
    })
  })
