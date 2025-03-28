import {
  ThreadResponseInterface,
  type ThreadInfoType as HeaderThreadInfoType,
  type LikeInfoType,
} from '@/types/thread.types'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { ThreadItem } from '../ThreadItem'
import { ThreadItemReply, type ThreadItemReplyProps } from '../ThreadItemReply'
import { ReplyContainer } from './ReplyContainer'

type ThreadInfoType = HeaderThreadInfoType & {
  question: string
  responses: ThreadResponseInterface[]
}

export type ThreadProps = {
  info: ThreadInfoType
  likes: LikeInfoType
  onQuestionLikeClick?: () => void
  onResponseLikeClick?: (answerId: number) => void
  onReplySubmit?: ThreadItemReplyProps['onSubmit']
  onCheckClick?: () => void
  userName?: string
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
  userName,
  isAuthorized = false,
  isFirst = false,
  isUser = false,
  isChecked = false,
  hasCommentButton = true,
}) => {
  const { responses, ...questionInfo } = info
  const [showReply, setShowReply] = useState<boolean>(false)
  const replyRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (showReply && replyRef.current) {
      replyRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [showReply])

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
        <div ref={replyRef}>
          <ThreadItemReply
            onSubmit={handleReplySubmit}
            onClose={handleReplyClose}
            isAuthorized={isAuthorized}
            userName={userName}
          />
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
