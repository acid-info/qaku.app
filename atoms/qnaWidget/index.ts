import { atom } from 'jotai'
import {
  ActiveObjectType,
  ActiveObjectTypeEnum,
  QnAWidgetStateType,
  qnaWidgetAtom,
} from './qnaWidgetAtom'

export const activeObjectAtom = atom(
  (get) => get(qnaWidgetAtom).activeObject,
  (get, set, activeObject: ActiveObjectType) => {
    const currentState = get(qnaWidgetAtom)
    set(qnaWidgetAtom, {
      ...currentState,
      activeObject,
    })
  },
)

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

export const setActiveQnAAtom = atom(null, (get, set, qnaId: number) => {
  set(activeObjectAtom, {
    id: qnaId,
    type: ActiveObjectTypeEnum.QnA,
  })
})

export const setActivePollAtom = atom(null, (get, set, pollId: number) => {
  set(activeObjectAtom, {
    id: pollId,
    type: ActiveObjectTypeEnum.Poll,
  })
})

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

export const resetQnAWidgetAtom = atom(null, (_, set) => {
  set(qnaWidgetAtom, {
    activeObject: {
      id: null,
      type: null,
    },
    expandedQnAIds: [],
  })
})

export {
  ActiveObjectTypeEnum,
  qnaWidgetAtom,
  type ActiveObjectType,
  type QnAWidgetStateType,
}
