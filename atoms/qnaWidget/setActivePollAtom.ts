import { atom } from 'jotai'
import { activeObjectAtom } from './activeObjectAtom'
import { ActiveObjectTypeEnum } from './qnaWidgetAtom'

export const setActivePollAtom = atom(null, (get, set, pollId: number) => {
  set(activeObjectAtom, {
    id: pollId,
    type: ActiveObjectTypeEnum.Poll,
  })
})
