import { useState } from 'react'

export interface ThreadResponse {
  info: {
    author: string
    timestamp: string
    response: string
  }
  likes: {
    count: number
    isLiked: boolean
  }
}

export interface Thread {
  info: {
    author: string
    timestamp: string
    question: string
    responses: ThreadResponse[]
  }
  likes: {
    count: number
    isLiked: boolean
  }
}

interface ReplyParams {
  message: string
  isAnonymous: boolean
  name?: string
}

export const useThreads = (initialThreads: Thread[]) => {
  const [threads, setThreads] = useState<Thread[]>(initialThreads)

  const handleQuestionLike = (index: number) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread, i) =>
        i === index
          ? {
              ...thread,
              likes: {
                isLiked: !thread.likes.isLiked,
                count: thread.likes.isLiked
                  ? thread.likes.count - 1
                  : thread.likes.count + 1,
              },
            }
          : thread,
      ),
    )
  }

  const handleResponseLike = (threadIndex: number, responseIndex: number) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread, i) =>
        i === threadIndex
          ? {
              ...thread,
              info: {
                ...thread.info,
                responses: thread.info.responses.map((response, j) =>
                  j === responseIndex
                    ? {
                        ...response,
                        likes: {
                          isLiked: !response.likes.isLiked,
                          count: response.likes.isLiked
                            ? response.likes.count - 1
                            : response.likes.count + 1,
                        },
                      }
                    : response,
                ),
              },
            }
          : thread,
      ),
    )
  }

  const handleReply = (
    index: number,
    { message, isAnonymous, name }: ReplyParams,
  ) => {
    const newResponse: ThreadResponse = {
      info: {
        author: isAnonymous ? 'Anonymous' : name || 'User',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        response: message,
      },
      likes: { count: 0, isLiked: false },
    }

    setThreads((prevThreads) =>
      prevThreads.map((thread, i) =>
        i === index
          ? {
              ...thread,
              info: {
                ...thread.info,
                responses: [...thread.info.responses, newResponse],
              },
            }
          : thread,
      ),
    )
  }

  return {
    threads,
    handleQuestionLike,
    handleResponseLike,
    handleReply,
  }
}
