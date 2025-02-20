import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import {
  Thread as ThreadType,
  useThreads,
} from '@/containers/QnaLive/hooks/useThreads'
import { mockThreads } from '@/data/mockThreads'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'

const CONTENT_WIDTH = 507

const ThreadList: React.FC<{ threads: ThreadType[] }> = ({ threads }) => (
  <ThreadsContainer>
    {threads.map((thread, index) => (
      <Thread
        key={`${thread.info.author}-${thread.info.timestamp}`}
        info={thread.info}
        likes={thread.likes}
        isFirst={index === 0}
        onReplySubmit={() => {}}
      />
    ))}
  </ThreadsContainer>
)

export const QnaCreated: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { threads } = useThreads(mockThreads)

  return (
    <Wrapper>
      <Main>
        <QnaCreatedHeaderStyled
          questionsCount={threads.length}
          anonymousRate={50}
          namedAuthorCount={
            threads.filter((thread) => thread.info.author !== 'Anonymous')
              .length
          }
        />
        <Content>
          <TabWrapper>
            <Tab
              variant="secondary"
              options={[
                { id: 'all', label: 'All' },
                { id: 'popular', label: 'Popular' },
                { id: 'answered', label: 'Answered' },
              ]}
              itemWidth="100px"
              activeId="all"
            />
          </TabWrapper>
          <ThreadList threads={threads} />
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
