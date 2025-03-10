import { atom } from 'jotai'
import { expandedQnAIdsAtom } from './expandedQnAIdsAtom'

export const toggleExpandedQnAAtom = atom(null, (get, set, qnaId: number) => {
  const expandedQnAIds = get(expandedQnAIdsAtom)
  const newExpandedQnAIds = new Set(expandedQnAIds)

  if (newExpandedQnAIds.has(qnaId)) {
    newExpandedQnAIds.delete(qnaId)
  } else {
    newExpandedQnAIds.add(qnaId)
  }

  set(expandedQnAIdsAtom, newExpandedQnAIds)
})
