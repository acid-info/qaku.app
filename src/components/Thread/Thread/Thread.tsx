import styled from '@emotion/styled'
import React, { useState } from 'react'

import { ThreadItem } from '../ThreadItem'
import {
  type ThreadInfo as HeaderThreadInfo,
  type LikeInfo,
} from '../ThreadItemHeader'
import { ThreadItemReply, type ThreadItemReplyProps } from '../ThreadItemReply'
import {
  ThreadItemResponse,
  type ThreadItemResponseProps,
} from '../ThreadItemResponse'

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
  const [showReply, setShowReply] = useState(false)

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
        {responses.map((response, index) => (
          <ThreadItemResponse
            key={`${response.info.author}-${response.info.timestamp}`}
            info={response.info}
            likes={response.likes}
            onLikeClick={() => onResponseLikeClick?.(index)}
          />
        ))}
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
