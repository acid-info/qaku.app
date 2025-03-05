import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { FilterThreadEnum } from '@/types/thread.types'
import { loadQnaData } from '@/utils/api.utils'
import { calculateQnAStats } from '@/utils/qna.utils'
import { filterQuestions, mapQuestionToThread } from '@/utils/thread.utils'
import styled from '@emotion/styled'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { answersRecordAtom } from '../../../atoms/answerAtom'
import { questionsRecordAtom } from '../../../atoms/questionAtom'
import { userAtom } from '../../../atoms/userAtom'
import { useQnaQuestionsWithAnswers } from '../../../hooks/useQnaQuestionsWithAnswers'

const CONTENT_WIDTH = 507

export type QnaCreatedProps = {
  qnaId: number
}

export const QnaCreated: React.FC<QnaCreatedProps> = ({ qnaId }) => {
  const [activeFilter, setActiveFilter] = useState<FilterThreadEnum>(
    FilterThreadEnum.All,
  )
  const user = useAtomValue(userAtom)
  const setQuestionsRecord = useSetAtom(questionsRecordAtom)
  const setAnswersRecord = useSetAtom(answersRecordAtom)

  useEffect(() => {
    loadQnaData(qnaId, setQuestionsRecord, setAnswersRecord)
  }, [qnaId, setQuestionsRecord, setAnswersRecord])

  const { questions: questionsWithAnswers, questionsCount } =
    useQnaQuestionsWithAnswers(qnaId)

  const qnaStats = useMemo(() => {
    const allAnswers = questionsWithAnswers.flatMap((q) => q.answers || [])
    return calculateQnAStats(questionsWithAnswers, allAnswers)
  }, [questionsWithAnswers])

  const threads = useMemo(() => {
    if (questionsWithAnswers.length === 0) return []

    return filterQuestions(questionsWithAnswers, activeFilter).map((question) =>
      mapQuestionToThread(question, user.id),
    )
  }, [questionsWithAnswers, activeFilter, user.id])

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
            {threads.map((thread, index) => (
              <Thread
                key={`${thread.info.author}-${thread.info.timestamp}-${index}`}
                info={thread.info}
                likes={thread.likes}
                isFirst={index === 0}
                isChecked={thread.info.isAnswered}
                hasCommentButton={false}
              />
            ))}
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
