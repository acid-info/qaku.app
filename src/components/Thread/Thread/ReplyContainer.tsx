import { Button } from '@/components/Button'
import { ThreadResponseInterface } from '@/types/thread.types'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { ThreadItemResponse } from '../ThreadItemResponse'

export type ReplyContainerProps = {
  responses: ThreadResponseInterface[]
  onResponseLikeClick?: (answerId: number) => void
}

export const ReplyContainer: React.FC<ReplyContainerProps> = ({
  responses,
  onResponseLikeClick,
}) => {
  const [expandedAuthors, setExpandedAuthors] = useState<
    Record<string, boolean>
  >({})

  const toggleExpand = (author: string) => {
    setExpandedAuthors((prev) => ({
      ...prev,
      [author]: !prev[author], // Toggle expansion for only the clicked author
    }))
  }

  const groupByAuthor = (data: ThreadResponseInterface[]) => {
    return data.reduce(
      (acc: Record<string, ThreadResponseInterface[]>, item) => {
        const author = item.info.author
        if (!acc[author]) {
          acc[author] = []
        }
        acc[author].push(item)
        return acc
      },
      {},
    )
  }

  const sortByTimestamp = (
    a: ThreadResponseInterface,
    b: ThreadResponseInterface,
  ) => {
    return (
      new Date(a.info.timestamp).getTime() -
      new Date(b.info.timestamp).getTime()
    )
  }

  return (
    <>
      {Object.entries(groupByAuthor(responses.sort(sortByTimestamp))).map(
        ([author, responses]) => {
          const isExpanded = expandedAuthors[author] || false
          const repliesLeft = responses.length - 2

          return (
            <Container key={author}>
              {responses
                .slice(0, isExpanded ? responses.length : 2)
                .map((response) => (
                  <ThreadItemResponse
                    key={`${response.info.author}-${response.info.timestamp}`}
                    info={response.info}
                    likes={response.likes}
                    onLikeClick={() => onResponseLikeClick?.(response.id)}
                  />
                ))}
              {repliesLeft > 0 && !isExpanded && (
                <Button variant="outlined" onClick={() => toggleExpand(author)}>
                  {repliesLeft} more {repliesLeft === 1 ? 'reply' : 'replies'}
                </Button>
              )}
            </Container>
          )
        },
      )}
    </>
  )
}

const Container = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  & > button {
    margin: 16px auto 0;
  }

  & > button:not(:last-child) {
    margin-bottom: 40px;
  }
`
