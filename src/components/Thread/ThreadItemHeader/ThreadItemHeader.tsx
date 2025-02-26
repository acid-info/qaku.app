import styled from '@emotion/styled'
import React from 'react'

import { IconButtonRound } from '@/components/IconButtonRound'
import { ChatBubbleOutlineIcon } from '@/components/Icons/ChatBubbleOutlineIcon'
import { CheckIcon } from '@/components/Icons/CheckIcon'
import { ProfileIcon } from '@/components/ProfileIcon'
import { TogglePill } from '@/components/TogglePill'
import { ActionVisibility, LikeInfo, ThreadInfo } from '@/types/thread.types'

export type ThreadItemHeaderProps = {
  info: ThreadInfo
  likes?: LikeInfo
  actions?: ActionVisibility
  profileIconVariant?: 'gray' | 'black'
  onCheckClick?: () => void
  onCommentClick?: () => void
  onLikeClick?: () => void
}

export const ThreadItemHeader: React.FC<ThreadItemHeaderProps> = ({
  info,
  likes,
  actions = {},
  profileIconVariant = 'gray',
  onCheckClick,
  onCommentClick,
  onLikeClick,
}) => {
  const { author, timestamp } = info
  const { comment = true, like = true, check = true } = actions

  return (
    <Container>
      <InfoContainer>
        <ProfileIcon variant={profileIconVariant} character={author} />
        <InfoText>
          <QuestionAuthor>{author}</QuestionAuthor>
          <QuestionTimestamp>
            {new Date(timestamp).toLocaleString()}
          </QuestionTimestamp>
        </InfoText>
      </InfoContainer>

      <ActionsContainer>
        {comment && (
          <IconButtonRound
            variant="outlined"
            icon={<ChatBubbleOutlineIcon />}
            onClick={onCommentClick}
          />
        )}
        {like && likes && (
          <TogglePill
            count={likes.count}
            isActive={likes.isLiked}
            onClick={onLikeClick}
          />
        )}
        {check && (
          <IconButtonRound
            variant="outlined"
            icon={<CheckIcon />}
            onClick={onCheckClick}
          />
        )}
      </ActionsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`

const QuestionAuthor = styled.span`
  color: var(--white);
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`

const QuestionTimestamp = styled(QuestionAuthor)`
  opacity: 0.5;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
