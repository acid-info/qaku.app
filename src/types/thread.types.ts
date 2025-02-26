export type ActionVisibility = {
  comment?: boolean
  like?: boolean
  check?: boolean
}

export type ThreadInfo = {
  author: string
  timestamp: string
}

export type LikeInfo = {
  count: number
  isLiked: boolean
}

export interface ThreadResponse {
  info: {
    author: string
    timestamp: string
    response: string
  }
  likes: LikeInfo
}

export interface Thread {
  info: ThreadInfo & {
    question: string
    responses: ThreadResponse[]
  }
  likes: LikeInfo
}
