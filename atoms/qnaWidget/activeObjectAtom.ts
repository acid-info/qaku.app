import { atom } from 'jotai'
import { ActiveObjectType, qnaWidgetAtom } from './qnaWidgetAtom'

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
