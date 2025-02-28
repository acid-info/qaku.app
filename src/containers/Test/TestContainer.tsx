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
import DefaultNav from '@/components/Navbar/DefaultNav'
import UserNav from '@/components/Navbar/UserNav'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { PollOptions } from '@/components/PollOptions'
import { QnAWidget } from '@/components/QnAWidget'
import { Search } from '@/components/Search'
import { SearchAndFilter } from '@/components/SearchAndFilter'
import { Tab } from '@/components/Tab'
import { Thread } from '@/components/Thread'
import { Tile } from '@/components/Tile'
import { TileItem } from '@/components/TileItem'
import { TitleBlock } from '@/components/TitleBlock'
import { ToggleButton } from '@/components/ToggleButton'
import { TogglePill } from '@/components/TogglePill'
import { WalletPanel } from '@/components/WalletPanel'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'

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

const QnAWidgetDemo = () => {
  const demoQnA = {
    id: 1,
    title: 'Town Hall Discussion',
    hash: 'abc123',
    owner: 'admin',
    hasAdmins: true,
    allowsParticipantsReplies: true,
    questionsIds: [],
    startDate: new Date(),
    isActive: true,
  }
  const demoQnA2 = {
    id: 2,
    title: 'Town Hall Discussion - long title that will be truncated',
    hash: 'def456',
    owner: 'admin',
    hasAdmins: true,
    allowsParticipantsReplies: true,
    questionsIds: [],
    startDate: new Date(),
    isActive: false,
  }

  const polls = [
    {
      id: 1,
      title: 'Budget Allocation',
      question: 'How should we allocate the budget?',
      qnaId: 1,
      optionsIds: [],
      optionsCount: [],
      hasCorrectAnswers: false,
      hasMultipleOptionsSelect: false,
      isResultVisible: true,
      isActive: true,
    },
    {
      id: 2,
      title: 'Project Timeline',
      question: 'What is the best timeline for the project?',
      qnaId: 1,
      optionsIds: [],
      optionsCount: [],
      hasCorrectAnswers: false,
      hasMultipleOptionsSelect: false,
      isResultVisible: true,
      isActive: true,
    },
    {
      id: 3,
      title: 'Team Structure',
      question: 'How should we structure the team?',
      qnaId: 1,
      optionsIds: [],
      optionsCount: [],
      hasCorrectAnswers: false,
      hasMultipleOptionsSelect: false,
      isResultVisible: true,
      isActive: true,
    },
  ]

  const [polls2, setPolls2] = useState<typeof polls>([])
  const [activeItemId, setActiveItemId] = useState<number>()
  const [activeItemId2, setActiveItemId2] = useState<number>()
  const [isExpanded1, setIsExpanded1] = useState(false)
  const [isExpanded2, setIsExpanded2] = useState(true)

  const handlePlusClick2 = () => {
    const newPoll = {
      id: polls2.length + 1,
      title: `New Poll ${polls2.length + 1}`,
      question: `Question for Poll ${polls2.length + 1}`,
      qnaId: 2,
      optionsIds: [],
      optionsCount: [],
      hasCorrectAnswers: false,
      hasMultipleOptionsSelect: false,
      isResultVisible: true,
      isActive: true,
    }
    setPolls2([...polls2, newPoll])
    console.log('Added new poll:', newPoll)
  }

  const handleQnAClick = (id: number) => {
    setActiveItemId(id)
    console.log('QnA clicked:', id)
  }

  const handleQnAClick2 = (id: number) => {
    setActiveItemId2(id)
    console.log('QnA clicked:', id)
  }

  const handlePollClick = (id: number) => {
    setActiveItemId(id)
    console.log('Poll clicked:', id)
  }

  const handlePollClick2 = (id: number) => {
    setActiveItemId2(id)
    console.log('Poll clicked:', id)
  }

  return (
    <DemoSection title="QnA Widget">
      <div
        style={{
          width: '346px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <QnAWidget
          qnaData={demoQnA}
          pollsData={polls}
          activeItemId={activeItemId}
          onQnAClick={handleQnAClick}
          onPollClick={handlePollClick}
          isExpanded={isExpanded1}
          onHeaderClick={() => setIsExpanded1(!isExpanded1)}
        />
        <QnAWidget
          hasPlusButton={true}
          isLive
          qnaData={demoQnA2}
          pollsData={polls2}
          isExpanded={isExpanded2}
          onHeaderClick={() => setIsExpanded2(!isExpanded2)}
          activeItemId={activeItemId2}
          onPlusClick={handlePlusClick2}
          onQnAClick={handleQnAClick2}
          onPollClick={handlePollClick2}
        />
      </div>
    </DemoSection>
  )
}

const NavbarDemo = () => {
  const [mode, setMode] = useState<NavbarModeEnum>(NavbarModeEnum.Qna)

  return (
    <DemoSection title="Navbars">
      <div style={{ maxWidth: 1400, width: '100%' }}>
        <h3>User Nav</h3>
        <UserNav
          mode={mode}
          title="Town Hall 2025 - New Positions, Updates, And Plans"
          count={3}
          id="3212345"
          onModeChange={(newMode) => setMode(newMode)}
        />

        <h3 style={{ marginTop: '32px' }}>Default Nav</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* QnA Mode */}
          <DefaultNav
            mode={NavbarModeEnum.Qna}
            isTitleOnly={true}
            title="Polls"
            date={'2023-12-25T15:00:00.000Z'}
            count={3}
            id="3212345"
          />
          {Object.values(QnaProgressStatusEnum).map((status) => (
            <DefaultNav
              key={status}
              mode={NavbarModeEnum.Qna}
              title={
                status === QnaProgressStatusEnum.Ended
                  ? 'Town Hall 2025'
                  : 'Town Hall 2025 - New Positions, Updates, And Plans'
              }
              date={'2023-12-25T15:00:00.000Z'}
              count={1236}
              id="3212345"
              status={status}
            />
          ))}

          {/* Polls Mode */}
          <DefaultNav
            mode={NavbarModeEnum.Polls}
            isTitleOnly={true}
            title="New Poll"
            date={'2023-12-25T15:00:00.000Z'}
            count={3}
            id="3212345"
          />
          {Object.values(QnaProgressStatusEnum).map((status) => (
            <DefaultNav
              key={`polls-${status}`}
              mode={NavbarModeEnum.Polls}
              title={
                status === QnaProgressStatusEnum.Ended
                  ? 'Town Hall 2025'
                  : 'Town Hall 2025 - New Positions, Updates, And Plans'
              }
              date={'2023-12-25T15:00:00.000Z'}
              count={1236}
              id="3212345"
              status={status}
            />
          ))}
        </div>
      </div>
    </DemoSection>
  )
}

const PollOptionsDemo = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>()

  const options = [
    {
      id: '1',
      title: 'Implement new feature',
      percentage: 45,
      isChecked: false,
    },
    {
      id: '2',
      title: 'Fix existing bugs',
      percentage: 30,
      isChecked: false,
    },
    {
      id: '3',
      title: 'Improve documentation',
      percentage: 25,
      isChecked: false,
    },
    {
      id: '4',
      title: 'Do nothing',
      percentage: 0,
      isChecked: false,
    },
  ]

  return (
    <DemoSection title="Poll Options">
      <div style={{ width: '500px' }}>
        <PollOptions
          options={options}
          selectedOptionId={selectedOptionId}
          onOptionSelect={setSelectedOptionId}
        />
      </div>
    </DemoSection>
  )
}

const WalletPanelDemo = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<'external' | 'qaku'>(
    'external',
  )

  return (
    <DemoSection title="Wallet Panel">
      <div style={{ width: '500px' }}>
        <WalletPanel
          isAuthorized={isAuthorized}
          onConnect={() => setIsAuthorized(true)}
          onWalletSelect={setSelectedWallet}
          selectedWallet={selectedWallet}
        />
      </div>
    </DemoSection>
  )
}

const TabDemo = () => {
  const [activeTabId, setActiveTabId] = useState<string | number>('overview')
  const [activeFilterId, setActiveFilterId] = useState<string | number>('all')

  const handleTabChange = (id: string | number) => {
    setActiveTabId(id)
  }

  const handleFilterChange = (id: string | number) => {
    setActiveFilterId(id)
  }

  return (
    <DemoSection title="Tabs">
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <div>
          <h3>Primary Variant</h3>
          <Tab
            options={[
              { id: 'overview', label: 'Overview' },
              { id: 'details', label: 'Details' },
              { id: 'settings', label: 'Settings' },
            ]}
            activeId={activeTabId}
            onChange={handleTabChange}
            itemWidth="100px"
          />
        </div>

        <div>
          <h3>Secondary Variant</h3>
          <Tab
            options={[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Active' },
              { id: 'completed', label: 'Completed' },
            ]}
            activeId={activeFilterId}
            onChange={handleFilterChange}
            variant="secondary"
            itemWidth="200px"
          />
        </div>
      </div>
    </DemoSection>
  )
}

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
        timestamp: '2025-02-15T11:48:36.135Z',
        question:
          'What are the key differences between React hooks and class components?',
        responses: [
          {
            info: {
              author: 'Bob',
              timestamp: '2025-02-16T11:48:36.135Z',
              response: 'Response 1',
            },
            likes: { count: 12, isLiked: false },
          },
          {
            info: {
              author: 'Chalie',
              timestamp: '2025-02-19T11:48:36.135Z',
              response: 'Response 4',
            },
            likes: { count: 12, isLiked: false },
          },
          {
            info: {
              author: 'Chalie',
              timestamp: '2025-02-17T11:48:36.135Z',
              response: 'Response 2',
            },
            likes: { count: 12, isLiked: false },
          },
          {
            info: {
              author: 'Bob',
              timestamp: '2025-02-18T11:48:36.135Z',
              response: 'Response 3',
            },
            likes: { count: 8, isLiked: true },
          },
          {
            info: {
              author: 'Bob',
              timestamp: '2025-02-20T11:48:36.135Z',
              response: 'Response 5',
            },
            likes: { count: 8, isLiked: true },
          },
          {
            info: {
              author: 'John',
              timestamp: '2025-02-18T11:48:36.135Z',
              response: 'Response 6',
            },
            likes: { count: 8, isLiked: true },
          },
          {
            info: {
              author: 'John',
              timestamp: '2025-02-20T11:48:36.135Z',
              response: 'Response 7',
            },
            likes: { count: 8, isLiked: true },
          },
          {
            info: {
              author: 'John',
              timestamp: '2025-02-21T11:48:36.135Z',
              response: 'Response 8',
            },
            likes: { count: 8, isLiked: true },
          },
          {
            info: {
              author: 'John',
              timestamp: '2025-02-22T11:48:36.135Z',
              response: 'Response 9',
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
        timestamp: '2025-02-20T11:48:36.135Z',
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
        maxLength={200}
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

const TileDemo = () => {
  return (
    <Section>
      <h2>Tile & TileItem</h2>
      <div style={{ display: 'flex', gap: '16px' }}>
        <TileItem label="Questions1" data={42} size="medium" isActive />
        <TileItem
          label="Questions2"
          data={12}
          size="medium"
          onClick={() => alert('hi')}
        />
        <TileItem label="Questions3" data={36} size="medium" />
      </div>
      <br />
      <div style={{ display: 'flex' }}>
        <Tile
          items={[
            {
              label: 'Questions4',
              data: 42,
              size: 'large',
              onClick: () => console.log('Clicked'),
            },
            {
              label: 'Questions5',
              data: 12,
              size: 'large',
            },
          ]}
        />
      </div>
    </Section>
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
    <NavbarDemo />
    <DemoSection title="Title Block">
      <TitleBlock
        title="What is the best approach here? Are there any alternatives?"
        description="Long description visible to all participants and everyone"
      />
      <TitleBlock title="What is the best approach here? Are there any alternatives?" />
    </DemoSection>
    <PollOptionsDemo />
    <QnAWidgetDemo />
    <TabDemo />
    <WalletPanelDemo />
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
    <TileDemo />
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
