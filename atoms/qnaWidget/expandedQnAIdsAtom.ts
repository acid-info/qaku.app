import { atom } from 'jotai'
import { qnaWidgetAtom } from './qnaWidgetAtom'

export const expandedQnAIdsAtom = atom(
  (get) => new Set(get(qnaWidgetAtom).expandedQnAIds),
  (get, set, expandedQnAIds: Set<number>) => {
    const currentState = get(qnaWidgetAtom)
    set(qnaWidgetAtom, {
      ...currentState,
      expandedQnAIds: Array.from(expandedQnAIds),
    })
  },
)
