import { ThreadItemHeader } from '@/components/Thread/ThreadItemHeader'
import {
  type ActionVisibilityType,
  type ThreadInfoType as HeaderThreadInfoType,
  type LikeInfoType,
} from '@/types/thread.types'
import styled from '@emotion/styled'
import React from 'react'

type ThreadInfoType = HeaderThreadInfoType & {
  question: string
}

export type ThreadItemProps = {
  info: ThreadInfoType
  likes: LikeInfoType
  actions?: ActionVisibilityType
  isFirst?: boolean
  isChecked?: boolean
  onCheckClick?: () => void
  onCommentClick?: () => void
  onLikeClick?: () => void
  children?: React.ReactNode
}

export const ThreadItem: React.FC<ThreadItemProps> = ({
  info,
  likes,
  actions,
  isFirst = false,
  isChecked = false,
  onCheckClick,
  onCommentClick,
  onLikeClick,
  children,
}) => {
  const { author, timestamp, question } = info

  return (
    <ThreadItemContainer $isFirst={isFirst}>
      <ThreadItemHeader
        info={{ author, timestamp }}
        likes={likes}
        actions={actions}
        isChecked={isChecked}
        onCheckClick={onCheckClick}
        onCommentClick={onCommentClick}
        onLikeClick={onLikeClick}
      />
      <Question>{question}</Question>
      <div>{children}</div>
    </ThreadItemContainer>
  )
}

const ThreadItemContainer = styled.div<{ $isFirst: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  border: 1px solid var(--gray);
  ${({ $isFirst }) => !$isFirst && `border-top: none;`}
`

const Question = styled.p`
  color: var(--white);
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
`
