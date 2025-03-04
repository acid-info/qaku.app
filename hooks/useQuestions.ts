import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { questionsRecordAtom } from '../atoms/questionAtom'

// Hook for accessing all questions data
export const useQuestions = () => {
  const questionsRecord = useAtomValue(questionsRecordAtom)

  const questions = useMemo(() => {
    return Object.values(questionsRecord)
  }, [questionsRecord])

  return {
    questions,
    questionsRecord,
    questionsCount: questions.length,
    answeredCount: questions.filter((q) => q.isAnswered).length,
    unansweredCount: questions.filter((q) => !q.isAnswered).length,
  }
}
