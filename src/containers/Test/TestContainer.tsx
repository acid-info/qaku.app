import styled from '@emotion/styled'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { CollapsibleToggle } from '@/components/CollapsibleToggle'
import { Dropdown } from '@/components/Dropdown'
import { IconButtonRound } from '@/components/IconButtonRound'
import { ChatBubbleOutlineIcon } from '@/components/Icons/ChatBubbleOutlineIcon'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { MessageForm } from '@/components/MessageForm'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { Search } from '@/components/Search'
import { SearchAndFilter } from '@/components/SearchAndFilter'
import { Thread } from '@/components/Thread'
import { ToggleButton } from '@/components/ToggleButton'
import { TogglePill } from '@/components/TogglePill'

type DemoSectionProps = {
  title: string
  children: React.ReactNode
}

const DemoSection: React.FC<DemoSectionProps> = ({ title, children }) => (
  <Section>
    <h2>{title}</h2>
    <ButtonGroup>{children}</ButtonGroup>
  </Section>
)

const SearchAndFilterDemo = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortFilter, setSortFilter] = useState<string>('recent')

  return (
    <DemoSection title="Search and Filter">
      <div style={{ width: '350px' }}>
        <SearchAndFilter
          onSearch={(value) => console.log('Search:', value)}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ]}
          value={statusFilter}
          onFilterChange={(value) => {
            console.log('Filter:', value)
            setStatusFilter(value as string)
          }}
          searchPlaceholder="Search items..."
          filterPlaceholder="Filter by status"
          filterWidth="93px"
        />
      </div>
      <div style={{ width: '500px' }}>
        <SearchAndFilter
          searchLabel="Find Questions"
          onSearch={(value) => console.log('Search:', value)}
          options={[
            { label: 'Most Recent', value: 'recent' },
            { label: 'Most Voted', value: 'voted' },
            { label: 'Most Answered', value: 'answered' },
          ]}
          value={sortFilter}
          onFilterChange={(value) => {
            console.log('Sort:', value)
            setSortFilter(value as string)
          }}
          searchPlaceholder="Type keywords..."
          filterPlaceholder="Sort by"
        />
      </div>
    </DemoSection>
  )
}

const ThreadDemo = () => {
  const [threads, setThreads] = useState([
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
  ])

  const handleQuestionLike = (index: number) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread, i) =>
        i === index
          ? {
              ...thread,
              likes: {
                isLiked: !thread.likes.isLiked,
                count: thread.likes.isLiked
                  ? thread.likes.count - 1
                  : thread.likes.count + 1,
              },
            }
          : thread,
      ),
    )
  }

  const handleResponseLike = (threadIndex: number, responseIndex: number) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread, i) =>
        i === threadIndex
          ? {
              ...thread,
              info: {
                ...thread.info,
                responses: thread.info.responses.map((response, j) =>
                  j === responseIndex
                    ? {
                        ...response,
                        likes: {
                          isLiked: !response.likes?.isLiked,
                          count: response.likes?.isLiked
                            ? response.likes.count - 1
                            : (response.likes?.count || 0) + 1,
                        },
                      }
                    : response,
                ),
              },
            }
          : thread,
      ),
    )
  }

  return (
    <DemoSection title="Threads">
      <div
        style={{
          width: '600px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {threads.map((thread, index) => (
          <Thread
            key={`${thread.info.author}-${thread.info.timestamp}`}
            info={thread.info}
            likes={thread.likes}
            isFirst={index === 0}
            onQuestionLikeClick={() => handleQuestionLike(index)}
            onResponseLikeClick={(responseIndex) =>
              handleResponseLike(index, responseIndex)
            }
            onReplySubmit={({ message, isAnonymous, resetForm, name }) => {
              const newResponse = {
                info: {
                  author: isAnonymous ? 'Anonymous' : name || 'User',
                  timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  response: message,
                },
                likes: { count: 0, isLiked: false },
              }

              setThreads((prevThreads) =>
                prevThreads.map((thread, i) =>
                  i === index
                    ? {
                        ...thread,
                        info: {
                          ...thread.info,
                          responses: [...thread.info.responses, newResponse],
                        },
                      }
                    : thread,
                ),
              )
              resetForm()
            }}
            isAuthorized={true}
            isUser={true}
          />
        ))}
      </div>
    </DemoSection>
  )
}

const CollapsibleDemo = () => (
  <DemoSection title="Collapsible">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '500px',
      }}
    >
      <Collapsible title="Add description">
        <textarea
          style={{ height: '100px' }}
          placeholder="Type something here.."
        />
      </Collapsible>
      <Collapsible title="Review password">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              color: 'var(--white)',
              opacity: 0.7,
              fontSize: 'var(--body2-font-size)',
              lineHeight: 'var(--body2-line-height)',
            }}
          >
            Generated automatically for encrypted Q&As
          </span>
          <PasswordGenerator />
        </div>
      </Collapsible>
      <Collapsible title="Default expanded" defaultExpanded>
        <div>This content is visible by default.</div>
      </Collapsible>
    </div>
  </DemoSection>
)

const CollapsibleToggleDemo = () => (
  <DemoSection title="Collapsible Toggle">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '500px',
      }}
    >
      <CollapsibleToggle
        title="Poll description"
        description="Add a description visible to participants"
      >
        <textarea
          style={{ height: '100px' }}
          placeholder="Type something here.."
        />
      </CollapsibleToggle>
      <CollapsibleToggle title="Toggle without description">
        <span>Some text content.</span>
      </CollapsibleToggle>
      <CollapsibleToggle
        title="Toggle with Form"
        description="Contains an interactive form element"
        defaultChecked
      >
        <MessageForm
          isAuthorized
          onSubmit={({ message, isAnonymous, resetForm }) => {
            console.log('Message:', message, 'isAnonymous:', isAnonymous)
            resetForm()
          }}
        />
      </CollapsibleToggle>
    </div>
  </DemoSection>
)

const MessageFormDemo = () => (
  <DemoSection title="Message Form">
    <div style={{ width: '500px' }}>
      <h3>Unauthorized</h3>
      <MessageForm
        onSubmit={({ message, isAnonymous, resetForm, name }) => {
          console.log(
            'Unauthorized message:',
            message,
            'Name:',
            name,
            'isAnonymous:',
            isAnonymous,
          )
          resetForm()
        }}
        messagePlaceholder="Write something..."
        namePlaceholder="Name... (opt.)"
      />
    </div>
    <div style={{ width: '500px' }}>
      <h3>Authorized</h3>
      <MessageForm
        isAuthorized
        onSubmit={({ message, isAnonymous, resetForm, name }) => {
          console.log(
            'Authorized message:',
            message,
            'Name:',
            name,
            'isAnonymous:',
            isAnonymous,
          )
          resetForm()
        }}
      />
    </div>
  </DemoSection>
)

const DropdownDemo = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | number>()
  const [selectedTheme, setSelectedTheme] = useState<string | number>()

  const options = {
    language: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
      { label: 'Italian', value: 'it' },
    ],
    theme: [
      { label: 'System', value: 'system' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
  }

  return (
    <DemoSection title="Dropdowns">
      <DropdownWrapper>
        <h3>Filled</h3>
        <Dropdown
          options={options.language}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          placeholder="Select Language"
        />
      </DropdownWrapper>
      <DropdownWrapper style={{ width: '130px' }}>
        <h3>Outlined</h3>
        <Dropdown
          options={options.theme}
          value={selectedTheme}
          onChange={setSelectedTheme}
          variant="outlined"
          placeholder="Select Theme"
        />
      </DropdownWrapper>
    </DemoSection>
  )
}

const ButtonDemo = () => {
  const buttonVariants = [
    'default',
    'outlined',
    'filledPrimary',
    'outlinedPrimary',
  ] as const

  const renderButtonSet = (size?: 'large') =>
    buttonVariants.map((variant) => (
      <React.Fragment key={`${size}-${variant}`}>
        <Button
          size={size}
          variant={variant === 'default' ? undefined : variant}
        >
          Button
        </Button>
        <Button
          size={size}
          variant={variant === 'default' ? undefined : variant}
          icon={<PlusIcon />}
        >
          Button
        </Button>
      </React.Fragment>
    ))

  return (
    <>
      <DemoSection title="Buttons">
        {renderButtonSet()}
        {renderButtonSet('large')}
        {buttonVariants.map((variant) => (
          <Button
            key={variant}
            variant={variant === 'default' ? undefined : variant}
            disabled
          >
            Button
          </Button>
        ))}
      </DemoSection>
    </>
  )
}

const IconButtonDemo = () => {
  const variants = [
    'default',
    'outlined',
    'filledPrimary',
    'outlinedPrimary',
  ] as const
  const sizes = ['small', 'medium', 'large'] as const

  return (
    <DemoSection title="Round Icon Buttons">
      {sizes.map((size) => (
        <React.Fragment key={size}>
          {variants.map((variant) => (
            <IconButtonRound
              key={`${size}-${variant}`}
              size={size === 'medium' ? undefined : size}
              variant={variant === 'default' ? undefined : variant}
              icon={<PlusIcon />}
            />
          ))}
        </React.Fragment>
      ))}
      {variants.map((variant) => (
        <IconButtonRound
          key={`disabled-${variant}`}
          variant={variant === 'default' ? undefined : variant}
          disabled
          icon={<PlusIcon />}
        />
      ))}
      <IconButtonRound
        variant="outlinedPrimary"
        icon={
          <PlusIcon style={{ width: '60px', height: '60px', color: 'red' }} />
        }
      />
    </DemoSection>
  )
}

const ToggleDemo = () => {
  const [toggleState, setToggleState] = useState(false)
  const [pillStates, setPillStates] = useState([
    { count: 42, active: false },
    { count: 24, active: true },
    { count: 1000, active: false },
  ])

  const handlePillClick = (index: number) => {
    setPillStates((prev) =>
      prev.map((state, i) =>
        i === index
          ? {
              count: state.active ? state.count - 1 : state.count + 1,
              active: !state.active,
            }
          : state,
      ),
    )
  }

  return (
    <>
      <DemoSection title="Toggle Button">
        <ToggleButton isOn={toggleState} onChange={setToggleState} />
      </DemoSection>
      <DemoSection title="Toggle Pills">
        {pillStates.map((state, index) => (
          <TogglePill
            key={index}
            count={state.count}
            isActive={state.active}
            icon={index > 0 ? <ChatBubbleOutlineIcon /> : undefined}
            activeIcon={index > 0 ? <ChatBubbleOutlineIcon /> : undefined}
            onClick={() => handlePillClick(index)}
          />
        ))}
      </DemoSection>
    </>
  )
}

export const TestContainer: React.FC = () => (
  <Container>
    <Separator style={{ marginTop: '0' }}>Patterns</Separator>
    <SearchAndFilterDemo />
    <ThreadDemo />
    <CollapsibleDemo />
    <CollapsibleToggleDemo />
    <MessageFormDemo />

    <Separator>Components</Separator>
    <DropdownDemo />
    <DemoSection title="Search">
      <Search onSearch={(value) => console.log('Search:', value)} />
      <Search
        label="Find Something"
        placeholder="Enter keywords..."
        onSearch={(value) => console.log('Search:', value)}
      />
    </DemoSection>
    <ToggleDemo />
    <ButtonDemo />
    <IconButtonDemo />
  </Container>
)

const Container = styled.div`
  padding: 32px;
  color: var(--white);

  h2,
  h3 {
    margin-bottom: 24px;
  }
`

const Section = styled.section`
  margin-bottom: 48px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`

const DropdownWrapper = styled.div`
  width: 200px;
`

const Separator = styled.h1`
  margin: 60px 0 30px 0;
`
