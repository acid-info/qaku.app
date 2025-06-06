import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsWithAnswers } from '@/../hooks/useQnaQuestionsWithAnswers'
import { Button } from '@/components/Button'
import DesktopOnly from '@/components/DesktopOnly/DesktopOnly'
import MobileOnly from '@/components/MobileOnly/MobileOnly'
import { ActionContainer } from '@/components/StyledComponents'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { breakpoints } from '@/configs/ui.configs'
import { USER } from '@/data/routes'
import { FilterThreadEnum } from '@/types/thread.types'
import { WalletConnectionStatusEnum } from '@/types/wallet.types'
import {
  addNewAnswer,
  likeAnswerById,
  likeQuestionById,
  toggleQuestionAnsweredStatus,
} from '@/utils/api.utils'
import { getFilteredQuestions, mapQuestionToThread } from '@/utils/thread.utils'
import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'

const CONTENT_WIDTH = 507

const EmptyState = ({ qnaId }: { qnaId: string }) => (
  <NoContentMessage>
    <h1>Your Q&A is live!</h1>
    <span>Participants can ask new questions</span>
    <MobileOnly>
      <Link
        href={USER.QNA.replace(':id', String(qnaId))}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="filled" size="medium">
          View as participant
        </Button>
      </Link>
    </MobileOnly>
  </NoContentMessage>
)

const NoQuestionsInThisTab = () => (
  <NoContentMessage className="tab-empty-state">
    <span>There are no questions in this tab.</span>
  </NoContentMessage>
)

export type QnaLiveProps = {
  qnaId: string
  userId: string
}

export const QnaLive: React.FC<QnaLiveProps> = ({ qnaId, userId }) => {
  const [activeFilter, setActiveFilter] = useState<FilterThreadEnum>(
    FilterThreadEnum.All,
  )
  const { status, userName } = useAtomValue(walletStateAtom)

  const {
    questions: allQuestions,
    answeredQuestions,
    unansweredQuestions,
    popularQuestions,
    questionsCount,
  } = useQnaQuestionsWithAnswers(qnaId)

  const filteredQuestions = useMemo(() => {
    return getFilteredQuestions(activeFilter, {
      allQuestions,
      answeredQuestions,
      unansweredQuestions,
      popularQuestions,
    })
  }, [
    activeFilter,
    allQuestions,
    answeredQuestions,
    unansweredQuestions,
    popularQuestions,
  ])

  const threads = useMemo(() => {
    return filteredQuestions.map((question) =>
      mapQuestionToThread(question, userId),
    )
  }, [filteredQuestions, userId])

  const handleQuestionLike = async (questionId: string) => {
    await likeQuestionById({ questionId, userId })
  }

  const handleResponseLike = async (answerId: string) => {
    await likeAnswerById({ answerId, userId })
  }

  const handleReply = async (
    questionId: string,
    params: { message: string; isAnonymous: boolean; name?: string },
  ) => {
    await addNewAnswer({
      questionId,
      qnaId,
      content: params.message,
      author: params.isAnonymous ? 'Anonymous' : params.name || userId,
    })
  }

  const handleCheck = async (questionId: string) => {
    await toggleQuestionAnsweredStatus(questionId)
  }

  const handleTabChange = useCallback((id: string | number) => {
    setActiveFilter(id.toString() as FilterThreadEnum)
  }, [])

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <TabWrapper>
          <Tab
            variant="secondary"
            options={[
              { id: FilterThreadEnum.All, label: 'All' },
              { id: FilterThreadEnum.Popular, label: 'Popular' },
              { id: FilterThreadEnum.Answered, label: 'Answered' },
            ]}
            itemWidth="100px"
            activeId={activeFilter}
            onChange={handleTabChange}
          />
        </TabWrapper>

        {threads.length > 0 ? (
          <ThreadsContainer>
            {threads.map((thread, index) => (
              <Thread
                key={`thread-${thread.info.questionId}`}
                info={thread.info}
                likes={thread.likes}
                isFirst={index === 0}
                userName={userName ?? undefined}
                onQuestionLikeClick={() =>
                  handleQuestionLike(thread.info.questionId)
                }
                onResponseLikeClick={(answerId) => handleResponseLike(answerId)}
                onReplySubmit={({ message, isAnonymous, resetForm, name }) => {
                  handleReply(thread.info.questionId, {
                    message,
                    isAnonymous,
                    name,
                  })
                  resetForm()
                }}
                onCheckClick={() => handleCheck(thread.info.questionId)}
                isChecked={thread.info.isAnswered}
                isAuthorized={status === WalletConnectionStatusEnum.Connected}
              />
            ))}
          </ThreadsContainer>
        ) : questionsCount > 0 ? (
          <NoQuestionsInThisTab />
        ) : (
          <EmptyState qnaId={qnaId} />
        )}
      </Main>
      <DesktopOnly>
        <ActionContainer>
          <Link
            href={USER.QNA.replace(':id', String(qnaId))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledButton variant="filled" size="large">
              View as participant
            </StyledButton>
          </Link>
        </ActionContainer>
      </DesktopOnly>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 16px;
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: ${breakpoints.sm}px) {
    padding-top: 40px !important;
    padding-bottom: 140px !important;
  }
`

const TabWrapper = styled.div`
  width: ${CONTENT_WIDTH}px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const ThreadsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CONTENT_WIDTH}px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const NoContentMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &.tab-empty-state {
    width: ${CONTENT_WIDTH}px;
    align-items: flex-start;
    justify-content: flex-start;

    @media (max-width: ${breakpoints.sm}px) {
      width: 100%;
    }
  }

  & span {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }

  button {
    margin-top: 24px;
  }
`

const StyledButton = styled(Button)`
  width: 200px;
`
