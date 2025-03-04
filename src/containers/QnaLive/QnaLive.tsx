import { Button } from '@/components/Button'
import { ActionContainer } from '@/components/StyledComponents'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { FilterThreadEnum } from '@/types/thread.types'
import {
  addNewAnswer,
  likeAnswerById,
  likeQuestionById,
  toggleQuestionAnsweredStatus,
} from '@/utils/api.utils'
import styled from '@emotion/styled'
import { useAtom, useAtomValue } from 'jotai'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'
import { userAtom } from '../../../atoms/userAtom'
import { useQnaQuestionsAnswersSubscriptions } from '../../../hooks/useQnaQuestionsAnswersSubscriptions'
import { useQnaQuestionsWithAnswers } from '../../../hooks/useQnaQuestionsWithAnswers'
import { filterQuestions, mapQuestionToThread } from '../../utils/thread.utils'
const CONTENT_WIDTH = 507

const EmptyState = () => (
  <NoContentMessage>
    <h1>Your Q&A is live!</h1>
    <span>Participants can ask new questions</span>
  </NoContentMessage>
)

export type QnaLiveProps = {
  qnaId: number
}

export const QnaLive: React.FC<QnaLiveProps> = ({ qnaId }) => {
  const [activeFilter, setActiveFilter] = useState<FilterThreadEnum>(
    FilterThreadEnum.All,
  )
  const [isAuthorized] = useAtom(isAuthorizedAtom)
  const user = useAtomValue(userAtom)

  useQnaQuestionsAnswersSubscriptions(qnaId)

  const { questions: qnaQuestions } = useQnaQuestionsWithAnswers(qnaId)

  const filteredQuestions = useMemo(() => {
    return filterQuestions(qnaQuestions, activeFilter)
  }, [qnaQuestions, activeFilter])

  const threads = useMemo(() => {
    return filteredQuestions.map((question) =>
      mapQuestionToThread(question, user.id),
    )
  }, [filteredQuestions, user.id])

  const handleQuestionLike = async (questionId: number) => {
    await likeQuestionById(questionId, user.id)
  }

  const handleResponseLike = async (answerId: number) => {
    await likeAnswerById(answerId, user.id)
  }

  const handleReply = async (
    questionId: number,
    params: { message: string; isAnonymous: boolean; name?: string },
  ) => {
    await addNewAnswer(
      questionId,
      qnaId,
      params.message,
      params.isAnonymous ? 'Anonymous' : params.name || user.id,
    )
  }

  const handleCheck = async (questionId: number) => {
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
                isAuthorized={isAuthorized}
              />
            ))}
          </ThreadsContainer>
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
  gap: 16px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const TabWrapper = styled.div`
  width: ${CONTENT_WIDTH}px;
`

const ThreadsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CONTENT_WIDTH}px;
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
