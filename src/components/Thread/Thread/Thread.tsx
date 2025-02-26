import styled from '@emotion/styled'
import React, { useState } from 'react'

import {
  type ThreadInfo as HeaderThreadInfo,
  type LikeInfo,
} from '@/types/thread.types'
import { ThreadItem } from '../ThreadItem'
import { ThreadItemReply, type ThreadItemReplyProps } from '../ThreadItemReply'
import { type ThreadItemResponseProps } from '../ThreadItemResponse'
import { ReplyContainer } from './ReplyContainer'

type ThreadInfo = HeaderThreadInfo & {
  question: string
  responses: Array<{
    info: ThreadItemResponseProps['info']
    likes?: LikeInfo
  }>
}

export type ThreadProps = {
  info: ThreadInfo
  likes: LikeInfo
  onQuestionLikeClick?: () => void
  onResponseLikeClick?: (index: number) => void
  onReplySubmit: ThreadItemReplyProps['onSubmit']
  isAuthorized?: boolean
  isFirst?: boolean
  isUser?: boolean
}

export const Thread: React.FC<ThreadProps> = ({
  info,
  likes,
  onQuestionLikeClick,
  onResponseLikeClick,
  onReplySubmit,
  isAuthorized = false,
  isFirst = false,
  isUser = false,
}) => {
  const { responses, ...questionInfo } = info
  const [showReply, setShowReply] = useState<boolean>(false)

  const handleCommentClick = () => {
    setShowReply((prev) => !prev)
  }

  const handleReplyClose = () => {
    setShowReply(false)
  }

  const handleReplySubmit: ThreadItemReplyProps['onSubmit'] = (params) => {
    onReplySubmit(params)
    setShowReply(false)
  }

  return (
    <Container>
      <ThreadItem
        info={questionInfo}
        isFirst={isFirst}
        likes={likes}
        onLikeClick={onQuestionLikeClick}
        onCommentClick={handleCommentClick}
        actions={{
          check: !isUser,
        }}
      >
        <ReplyContainer
          responses={responses}
          onResponseLikeClick={onResponseLikeClick}
        />
      </ThreadItem>
      {showReply && (
        <ThreadItemReply
          onSubmit={handleReplySubmit}
          onClose={handleReplyClose}
          isAuthorized={isAuthorized}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
