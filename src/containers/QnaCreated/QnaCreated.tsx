import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsWithAnswers } from '@/../hooks/useQnaQuestionsWithAnswers'
import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { FilterThreadEnum } from '@/types/thread.types'
import { calculateQnAStats } from '@/utils/qna.utils'
import { getFilteredQuestions, mapQuestionToThread } from '@/utils/thread.utils'
import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import React, { useCallback, useMemo, useState } from 'react'

const CONTENT_WIDTH = 507

const NoQuestionsInThisTab = () => (
  <NoContentMessage>
    <span>There are no questions in this tab.</span>
  </NoContentMessage>
)

export type QnaCreatedProps = {
  qnaId: number
}

export const QnaCreated: React.FC<QnaCreatedProps> = ({ qnaId }) => {
  const [activeFilter, setActiveFilter] = useState<FilterThreadEnum>(
    FilterThreadEnum.All,
  )
  const { userName } = useAtomValue(walletStateAtom)

  const {
    questions: allQuestions,
    answeredQuestions,
    unansweredQuestions,
    popularQuestions,
    questionsCount,
  } = useQnaQuestionsWithAnswers(qnaId)

  const qnaStats = useMemo(() => {
    const allAnswers = allQuestions.flatMap((q) => q.answers || [])
    return calculateQnAStats(allQuestions, allAnswers)
  }, [allQuestions])

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
    if (filteredQuestions.length === 0) return []

    return filteredQuestions.map((question) =>
      mapQuestionToThread(question, userName ?? ''),
    )
  }, [filteredQuestions, userName])

  const handleTabChange = useCallback((id: string | number) => {
    setActiveFilter(id.toString() as FilterThreadEnum)
  }, [])

  return (
    <Wrapper>
      <Main>
        <QnaCreatedHeaderStyled
          questionsCount={questionsCount}
          anonymousRate={qnaStats.anonymousRate}
          namedAuthorCount={qnaStats.namedAuthorCount}
        />
        <Content>
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
          <ThreadsContainer>
            {threads.length > 0 ? (
              threads.map((thread, index) => (
                <Thread
                  key={`${thread.info.author}-${thread.info.timestamp}-${index}`}
                  info={thread.info}
                  likes={thread.likes}
                  isFirst={index === 0}
                  isChecked={thread.info.isAnswered}
                  hasCommentButton={false}
                />
              ))
            ) : (
              <NoQuestionsInThisTab />
            )}
          </ThreadsContainer>
        </Content>
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
  gap: 56px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const QnaCreatedHeaderStyled = styled(QnaCreatedHeader)`
  padding: 16px 16px 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
  width: 100%;
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
  height: 100%;
  width: ${CONTENT_WIDTH}px;
  align-items: flex-start;
  justify-content: flex-start;

  & span {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }
`
