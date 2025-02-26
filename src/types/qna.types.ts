export interface QnAInterface {
  id: string
  title: string
  isLive?: boolean
  polls: PollInterface[]
}

export interface PollInterface {
  id: string
  title: string
  isLive?: boolean
}

export type qnaDataType = {
  id: string
  title: string
}

export type pollDataType = {
  id: string
  title: string
}

export enum QnAFilterTypeEnum {
  All = 'all',
  Active = 'active',
}
