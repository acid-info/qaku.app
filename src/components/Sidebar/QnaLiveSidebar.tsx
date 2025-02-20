import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '../Button'
import { IconButtonRound } from '../IconButtonRound'
import { PlusIcon } from '../Icons/PlusIcon'
import { SettingsIcon } from '../Icons/SettingsIcon'
import { QnAWidget } from '../QnAWidget'
import { SearchAndFilter } from '../SearchAndFilter'
import { Row } from '../StyledComponents'
import { Tile } from '../Tile'

export const QnaLiveSidebar: React.FC = () => {
  const router = useRouter()
  const demoQnA = {
    id: 'qna-1',
    title: 'New Qaku',
  }
  const polls: { id: string; title: string }[] = []

  const handlePlusClick = () => {
    router.push('/poll/create')
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Your Q&As</Title>
        <Row gap={8}>
          <Link href="/settings">
            <IconButtonRound icon={<SettingsIcon />} />
          </Link>
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
        <QnAWidget
          isLive
          qnaData={demoQnA}
          pollsData={polls}
          activeItemId="qna-1"
          onQnAClick={() => {}}
          onPollClick={() => {}}
          hasPlusButton
          isDefaultExpanded
          onPlusClick={handlePlusClick}
        />
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
  width: 100%;
  gap: 24px;
`
