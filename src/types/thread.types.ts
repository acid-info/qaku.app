export type ActionVisibilityType = {
  comment?: boolean
  like?: boolean
  check?: boolean
}

export type ThreadInfoType = {
  author: string
  timestamp: string
}

export type LikeInfoType = {
  count: number
  isLiked: boolean
}

export interface ThreadResponseInterface {
  id: number
  info: {
    author: string
    timestamp: string
    response: string
  }
  likes: LikeInfoType
}

export interface ThreadInterface {
  info: ThreadInfoType & {
    question: string
    isAnswered: boolean
    questionId: number
    responses: ThreadResponseInterface[]
  }
  likes: LikeInfoType
}

export enum FilterThreadEnum {
  All = 'all',
  Popular = 'popular',
  Answered = 'answered',
}
