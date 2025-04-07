import { atom } from 'jotai'

export enum ActiveObjectTypeEnum {
  QnA = 'qna',
  Poll = 'poll',
}

export type ActiveObjectType = {
  id: string | null
  type: ActiveObjectTypeEnum | null
}

export type QnAWidgetStateType = {
  activeObject: ActiveObjectType
  expandedQnAIds: string[]
}

const initialState: QnAWidgetStateType = {
  activeObject: {
    id: null,
    type: null,
  },
  expandedQnAIds: [],
}

export const qnaWidgetAtom = atom<QnAWidgetStateType>(initialState)
