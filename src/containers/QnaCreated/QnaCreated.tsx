import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsWithAnswers } from '@/../hooks/useQnaQuestionsWithAnswers'
import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { breakpoints } from '@/configs/ui.configs'
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
  qnaId: string
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
        <ScrollWrapper>
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
        </ScrollWrapper>
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

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 16px;
  }
`

const Main = styled.div`
  height: 100%;
  width: 100%;
`

const ScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 56px;

  @media (max-width: ${breakpoints.sm}px) {
    padding-top: 40px;
    padding-bottom: 140px;
  }
`

const QnaCreatedHeaderStyled = styled(QnaCreatedHeader)`
  padding: 16px 16px 0;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0;
  }
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
  height: 100%;
  width: ${CONTENT_WIDTH}px;

  align-items: flex-start;
  justify-content: flex-start;

  & span {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`
