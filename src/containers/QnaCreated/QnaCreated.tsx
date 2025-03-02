import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { FilterThreadEnum } from '@/types/thread.types'
import { filterQuestions, mapQuestionToThread } from '@/utils/thread.utils'
import styled from '@emotion/styled'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'
import {
  QuestionWithAnswersType,
  allQuestionsWithAnswersForQnAAtom,
  qnaCountsByIdAtom,
} from '../../../atoms/selectors'

const CONTENT_WIDTH = 507

const emptyQuestionsAtom = atom<QuestionWithAnswersType[]>([])
const emptyCountsAtom = atom({
  questionsCount: 0,
  namedAuthorCount: 0,
  anonymousRate: 0,
})

export const QnaCreated: React.FC = () => {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<FilterThreadEnum>(
    FilterThreadEnum.All,
  )

  const qnaId = useMemo(() => {
    const id = router.query.id
    return typeof id === 'string' ? parseInt(id, 10) || null : null
  }, [router.query.id])

  const questionsAtom = useMemo(
    () =>
      qnaId !== null
        ? allQuestionsWithAnswersForQnAAtom(qnaId)
        : emptyQuestionsAtom,
    [qnaId],
  )
  const countsAtom = useMemo(
    () => (qnaId !== null ? qnaCountsByIdAtom(qnaId) : emptyCountsAtom),
    [qnaId],
  )

  const questionsWithAnswers = useAtomValue(questionsAtom)
  const qnaCounts = useAtomValue(countsAtom)

  const threads = useMemo(() => {
    if (qnaId === null || questionsWithAnswers.length === 0) return []

    return filterQuestions(questionsWithAnswers, activeFilter).map((question) =>
      mapQuestionToThread(question),
    )
  }, [questionsWithAnswers, activeFilter, qnaId])

  const handleTabChange = useCallback((id: string | number) => {
    setActiveFilter(id.toString() as FilterThreadEnum)
  }, [])

  if (!router.isReady || qnaId === null || questionsWithAnswers.length === 0) {
    return null
  }

  const counts = qnaCounts || {
    questionsCount: 0,
    namedAuthorCount: 0,
    anonymousRate: 0,
  }

  return (
    <Wrapper>
      <Main>
        <QnaCreatedHeaderStyled
          questionsCount={counts.questionsCount}
          anonymousRate={counts.anonymousRate}
          namedAuthorCount={counts.namedAuthorCount}
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
