import { MessageForm } from '@/components/MessageForm'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { FilterThreadEnum } from '@/types/thread.types'
import {
  addNewAnswer,
  addNewQuestion,
  likeAnswerById,
  likeQuestionById,
} from '@/utils/api.utils'
import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import React, { useCallback, useMemo, useState } from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'
import { useQnaQuestionsWithAnswers } from '../../../hooks/useQnaQuestionsWithAnswers'
import {
  getFilteredQuestions,
  mapQuestionToThread,
} from '../../utils/thread.utils'
const CONTENT_WIDTH = 507

const EmptyState = () => (
  <NoContentMessage>
    <span>There are no questions yet.</span>
    <h1>Ask the first one!</h1>
  </NoContentMessage>
)

const NoQuestionsInThisTab = () => (
  <NoContentMessage className="tab-empty-state">
    <span>There are no questions in this tab.</span>
  </NoContentMessage>
)

export type QnaUserProps = {
  qnaId: number
  userId: string
}

export const QnaUser: React.FC<QnaUserProps> = ({ qnaId, userId }) => {
  const [activeFilter, setActiveFilter] = useState<FilterThreadEnum>(
    FilterThreadEnum.All,
  )
  const isAuthorized = useAtomValue(isAuthorizedAtom)

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

  const handleQuestionLike = async (questionId: number) => {
    await likeQuestionById({ questionId, userId })
  }

  const handleResponseLike = async (answerId: number) => {
    await likeAnswerById({ answerId, userId })
  }

  const handleReply = async (
    questionId: number,
    params: { message: string; isAnonymous: boolean; name?: string },
  ) => {
    await addNewAnswer({
      questionId,
      qnaId,
      content: params.message,
      author: params.isAnonymous ? 'Anonymous' : params.name || userId,
    })
  }

  const handleTabChange = useCallback((id: string | number) => {
    setActiveFilter(id.toString() as FilterThreadEnum)
  }, [])

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <StyledMessageForm
          messagePlaceholder="Type your question"
          onSubmit={async ({ message, isAnonymous, resetForm, name }) => {
            await addNewQuestion({
              qnaId,
              content: message,
              author: isAnonymous ? 'Anonymous' : name || userId,
            })
            resetForm()
          }}
          isAuthorized={isAuthorized}
        />

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
                isChecked={thread.info.isAnswered}
                isAuthorized={isAuthorized}
                isUser={true}
              />
            ))}
          </ThreadsContainer>
        ) : questionsCount > 0 ? (
          <NoQuestionsInThisTab />
        ) : (
          <EmptyState />
        )}
      </Main>
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

const StyledMessageForm = styled(MessageForm)`
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
  ::placeholder {
  }
  margin-bottom: 40px;
  width: ${CONTENT_WIDTH}px;
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
  gap: 14px;
  height: 100%;
  opacity: 0.5;

  &.tab-empty-state {
    width: ${CONTENT_WIDTH}px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  & span {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }
`
