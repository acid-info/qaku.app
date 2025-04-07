import { atom } from 'jotai'
import { activeObjectAtom } from './activeObjectAtom'
import { ActiveObjectTypeEnum } from './qnaWidgetAtom'

export const setActiveQnAAtom = atom(null, (get, set, qnaId: string) => {
  set(activeObjectAtom, {
    id: qnaId,
    type: ActiveObjectTypeEnum.QnA,
  })
})
