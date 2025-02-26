import { ThreadItemHeader } from '@/components/Thread/ThreadItemHeader'
import {
  type ThreadInfo as HeaderThreadInfo,
  type LikeInfo,
} from '@/types/thread.types'
import styled from '@emotion/styled'
import React from 'react'

type ThreadInfo = HeaderThreadInfo & {
  response: string
}

export type ThreadItemResponseProps = {
  info: ThreadInfo
  likes?: LikeInfo
  onLikeClick?: () => void
}

export const ThreadItemResponse: React.FC<ThreadItemResponseProps> = ({
  info,
  likes,
  onLikeClick,
}) => {
  const { author, timestamp, response } = info

  return (
    <Container>
      <ThreadItemHeader
        info={{ author, timestamp }}
        likes={likes}
        actions={{
          comment: false,
          like: true,
          check: false,
        }}
        onLikeClick={onLikeClick}
        profileIconVariant="black"
      />
      <Response>{response}</Response>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-darker);
  padding: 16px;
  gap: 16px;

  &:first-of-type {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  &:last-of-type {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray);
  }
`

const Response = styled.p`
  color: var(--white);
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
`
