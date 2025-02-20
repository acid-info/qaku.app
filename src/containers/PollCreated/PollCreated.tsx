import { PollOptions } from '@/components/PollOptions'
import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { Thread } from '@/components/Thread'
import { TitleBlock } from '@/components/TitleBlock'
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

export const PollCreated: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { threads } = useThreads(mockThreads)

  const options = [
    {
      id: '1',
      title: 'Option 1',
      percentage: 65,
      isChecked: false,
    },
    {
      id: '2',
      title: 'Option 2',
      percentage: 20,
      isChecked: false,
    },
    {
      id: '3',
      title: 'Option 3',
      percentage: 5,
      isChecked: false,
    },
    {
      id: '4',
      title: 'Option 4',
      percentage: 10,
      isChecked: false,
    },
    {
      id: '5',
      title: 'Option 5',
      percentage: 0,
      isChecked: false,
    },
  ]

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
          <TitleBlock
            title="What is the best approach here? Are there any alternatives?"
            description="Long description visible to all participants and everyone"
          />
          <PollOptions options={options} />
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
  gap: 32px;
  height: 100%;
  width: 507px;
`

const ThreadsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CONTENT_WIDTH}px;
`
