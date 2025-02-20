import { Button } from '@/components/Button'
import { ActionContainer } from '@/components/StyledComponents'
import { Thread } from '@/components/Thread'
import { mockThreads } from '@/data/mockThreads'
import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'
import { Thread as ThreadType, useThreads } from './hooks/useThreads'

const EmptyState = () => (
  <NoContentMessage>
    <h1>Your Q&A is live!</h1>
    <span>Participants can ask new questions</span>
  </NoContentMessage>
)

interface ThreadListProps {
  threads: ThreadType[]
  onLike: (index: number) => void
  onResponseLike: (threadIndex: number, responseIndex: number) => void
  onReply: (
    index: number,
    params: { message: string; isAnonymous: boolean; name?: string },
  ) => void
  isAuthorized: boolean
}

const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  onLike,
  onResponseLike,
  onReply,
  isAuthorized,
}) => (
  <ThreadsContainer>
    {threads.map((thread, index) => (
      <Thread
        key={`${thread.info.author}-${thread.info.timestamp}`}
        info={thread.info}
        likes={thread.likes}
        isFirst={index === 0}
        onQuestionLikeClick={() => onLike(index)}
        onResponseLikeClick={(responseIndex) =>
          onResponseLike(index, responseIndex)
        }
        onReplySubmit={({ message, isAnonymous, resetForm, name }) => {
          onReply(index, { message, isAnonymous, name })
          resetForm()
        }}
        isAuthorized={isAuthorized}
      />
    ))}
  </ThreadsContainer>
)

export const QnaLive: React.FC = () => {
  const [isAuthorized] = useAtom(isAuthorizedAtom)
  const { threads, handleQuestionLike, handleResponseLike, handleReply } =
    useThreads(mockThreads)

  return (
    <Wrapper>
      <Main className="scrollable-container">
        {threads.length > 0 ? (
          <ThreadList
            threads={threads}
            onLike={handleQuestionLike}
            onResponseLike={handleResponseLike}
            onReply={handleReply}
            isAuthorized={isAuthorized}
          />
        ) : (
          <EmptyState />
        )}
      </Main>
      <ActionContainer>
        <Link href="/user/qna" target="_blank" rel="noopener noreferrer">
          <StyledButton variant="filled" size="large">
            View as participant
          </StyledButton>
        </Link>
      </ActionContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const ThreadsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 507px;
`

const NoContentMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  & span {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }
`

const StyledButton = styled(Button)`
  width: 200px;
`
