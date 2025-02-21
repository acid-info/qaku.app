import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '../Button'
import { PlusIcon } from '../Icons/PlusIcon'
import { QnAWidget } from '../QnAWidget'
import { SearchAndFilter } from '../SearchAndFilter'
import { SettingsButton } from '../SettingsButton'
import { Row } from '../StyledComponents'
import { Tile } from '../Tile'

export const QnaLiveSidebar: React.FC = () => {
  const router = useRouter()
  const demoQnAs = [
    {
      id: 'qna-1',
      title: 'Community Town Hall Q&A',
      polls: [
        { id: 'poll-1-1', title: 'Platform Feature Priority' },
        { id: 'poll-1-2', title: 'Meeting Time Preference' },
        { id: 'poll-1-3', title: 'Communication Channel' },
      ],
    },
    {
      id: 'qna-2',
      title: 'Product Launch Feedback',
      polls: [
        { id: 'poll-2-1', title: 'UI/UX Rating' },
        { id: 'poll-2-2', title: 'Pricing Model Survey' },
      ],
    },
    {
      id: 'qna-3',
      title: 'Developer Workshop Series',
      polls: [
        { id: 'poll-3-1', title: 'Tech Stack Preferences' },
        { id: 'poll-3-2', title: 'Workshop Topics' },
      ],
    },
  ]

  const handlePlusClick = () => {
    router.push('/poll/create')
  }

  const handleQnAClick = (qnaId: string) => {
    if (qnaId === 'qna-1') {
      router.push('/qna/live')
    } else {
      router.push(`/qna/created/${qnaId}`)
    }
  }

  const handlePollClick = (pollId: string) => {
    const isLivePoll = demoQnAs
      .find((qna) => qna.id === 'qna-1')
      ?.polls.some((poll) => poll.id === pollId)

    if (isLivePoll) {
      router.push('/poll/live')
    } else {
      router.push(`/poll/created/${pollId}`)
    }
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Your Q&As</Title>
        <Row gap={8}>
          <SettingsButton />
          <Link href="/qna/create">
            <Button variant="filledPrimary" icon={<PlusIcon />}>
              Create
            </Button>
          </Link>
        </Row>
      </TitleContainer>
      <SidebarContent>
        <Tile
          items={[
            {
              label: 'All',
              data: 4,
              size: 'large',
              isActive: true,
            },
            {
              label: 'Active',
              data: 1,
              size: 'large',
            },
          ]}
        />
        <SearchAndFilter
          options={[
            { label: 'Recent', value: 'recent' },
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ]}
          value="recent"
          searchPlaceholder="Search items..."
          filterPlaceholder="Filter by status"
          filterWidth="93px"
          onSearch={() => {}}
          onFilterChange={() => {}}
        />
        <QnaWidgetContainer>
          {demoQnAs.map((qna) => (
            <QnAWidget
              key={qna.id}
              isLive={qna.id === 'qna-1'}
              qnaData={qna}
              pollsData={qna.polls}
              activeItemId={qna.id}
              onQnAClick={handleQnAClick}
              onPollClick={handlePollClick}
              hasPlusButton
              isDefaultExpanded={qna.id === 'qna-1'}
              onPlusClick={handlePlusClick}
            />
          ))}
        </QnaWidgetContainer>
      </SidebarContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Title = styled.h2`
  color: var(--white);
`

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  min-height: 0;
`

const QnaWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
