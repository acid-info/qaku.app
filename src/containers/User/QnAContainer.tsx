import { MessageForm } from '@/components/MessageForm'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import React from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'

export const QnAContainer: React.FC = () => {
  const isAuthorized = useAtomValue(isAuthorizedAtom)

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Column>
          <StyledMessageForm
            messagePlaceholder="Type your question"
            onSubmit={() => {}}
          />
          <ThreadContainer>
            {threads?.length ? (
              <div>
                <TabContainer>
                  <Tab
                    options={[
                      { id: 'recent', label: 'Recent' },
                      { id: 'popular', label: 'Popular' },
                      { id: 'Answered', label: 'Answered' },
                    ]}
                    activeId={'recent'}
                    variant="secondary"
                    itemWidth="100px"
                  />
                </TabContainer>
                {threads.map((thread, index) => (
                  <Thread
                    key={`${thread.info.author}-${thread.info.timestamp}`}
                    info={thread.info}
                    likes={thread.likes}
                    isFirst={index === 0}
                    onReplySubmit={() => {}}
                    isAuthorized={isAuthorized}
                    isUser={true}
                  />
                ))}
              </div>
            ) : (
              <NoThreadsContainer>
                <p>There are no questions yet..</p>
                <span>Ask the first one!</span>
              </NoThreadsContainer>
            )}
          </ThreadContainer>
        </Column>
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 507px;
`

const StyledMessageForm = styled(MessageForm)`
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
  ::placeholder {
  }
`

const TabContainer = styled.div`
  display: flex;
  margin-top: 56px;
  margin-bottom: 16px;
`

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const NoThreadsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 14px;
  opacity: 0.5;

  // horizontal, vertical center of the page
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  p {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }

  span {
    font-size: var(--h1-font-size);
    line-height: var(--h1-line-height);
  }
`

const threads = [
  {
    info: {
      author: 'Anonymous',
      timestamp: '15:12',
      question: 'How to enable privacy secured approach into this system?',
      responses: [],
    },
    likes: { count: 1, isLiked: true },
  },
  {
    info: {
      author: 'Alice',
      timestamp: '15:32',
      question:
        'What are the key differences between React hooks and class components?',
      responses: [
        {
          info: {
            author: 'Bob',
            timestamp: '15:45',
            response:
              'Hooks are more flexible and allow better code reuse. They also eliminate the complexity of lifecycle methods.',
          },
          likes: { count: 12, isLiked: false },
        },
        {
          info: {
            author: 'Charlie',
            timestamp: '16:00',
            response:
              'Class components can be easier to understand for developers coming from OOP backgrounds.',
          },
          likes: { count: 8, isLiked: true },
        },
      ],
    },
    likes: { count: 42, isLiked: true },
  },
  {
    info: {
      author: 'Bob',
      timestamp: '02:00',
      question:
        'How do you handle state management in large React applications?',
      responses: [],
    },
    likes: { count: 28, isLiked: false },
  },
  {
    info: {
      author: 'Anonymous',
      timestamp: '15:12',
      question: 'How to enable privacy secured approach into this system?',
      responses: [],
    },
    likes: { count: 1, isLiked: false },
  },
  {
    info: {
      author: 'Anonymous',
      timestamp: '15:12',
      question: 'How to enable privacy secured approach into this system?',
      responses: [],
    },
    likes: { count: 1, isLiked: false },
  },
  {
    info: {
      author: 'Anonymous',
      timestamp: '15:12',
      question: 'How to enable privacy secured approach into this system?',
      responses: [],
    },
    likes: { count: 1, isLiked: false },
  },
  {
    info: {
      author: 'Anonymous',
      timestamp: '15:12',
      question: 'How to enable privacy secured approach into this system?',
      responses: [],
    },
    likes: { count: 1, isLiked: false },
  },
]
