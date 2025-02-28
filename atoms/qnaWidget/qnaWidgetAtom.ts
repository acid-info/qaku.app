import { atom } from 'jotai'

export enum ActiveObjectTypeEnum {
  QnA = 'qna',
  Poll = 'poll',
}

export type ActiveObjectType = {
  id: number | null
  type: ActiveObjectTypeEnum | null
}

export type QnAWidgetStateType = {
  activeObject: ActiveObjectType
  expandedQnAIds: number[]
}

const initialState: QnAWidgetStateType = {
  activeObject: {
    id: null,
    type: null,
  },
  expandedQnAIds: [],
}

export const qnaWidgetAtom = atom<QnAWidgetStateType>(initialState)
