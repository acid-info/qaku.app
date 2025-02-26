export interface QnA {
  id: string
  title: string
  isLive?: boolean
  polls: Poll[]
}

export interface Poll {
  id: string
  title: string
  isLive?: boolean
}

export type qnaData = {
  id: string
  title: string
}

export type pollData = {
  id: string
  title: string
}

export type QnAFilter = 'all' | 'active'
