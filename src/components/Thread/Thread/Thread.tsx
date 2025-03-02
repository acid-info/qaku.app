import {
  type ThreadInfoType as HeaderThreadInfoType,
  type LikeInfoType,
} from '@/types/thread.types'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { ThreadItem } from '../ThreadItem'
import { ThreadItemReply, type ThreadItemReplyProps } from '../ThreadItemReply'
import { type ThreadItemResponseProps } from '../ThreadItemResponse'
import { ReplyContainer } from './ReplyContainer'

type ThreadInfoType = HeaderThreadInfoType & {
  question: string
  responses: Array<{
    info: ThreadItemResponseProps['info']
    likes?: LikeInfoType
  }>
}

export type ThreadProps = {
  info: ThreadInfoType
  likes: LikeInfoType
  onQuestionLikeClick?: () => void
  onResponseLikeClick?: (index: number) => void
  onReplySubmit?: ThreadItemReplyProps['onSubmit']
  onCheckClick?: () => void
  isAuthorized?: boolean
  isFirst?: boolean
  isUser?: boolean
  isChecked?: boolean
  hasCommentButton?: boolean
}

export const Thread: React.FC<ThreadProps> = ({
  info,
  likes,
  onQuestionLikeClick,
  onResponseLikeClick,
  onReplySubmit = () => {},
  onCheckClick,
  isAuthorized = false,
  isFirst = false,
  isUser = false,
  isChecked = false,
  hasCommentButton = true,
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
        onCheckClick={onCheckClick}
        isChecked={isChecked}
        actions={{
          check: !isUser,
          comment: hasCommentButton,
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
