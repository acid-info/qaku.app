import { PollType, QnAFilterTypeEnum, QnAType } from '@/types/qna.types'
import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { Button } from '../Button'
import { PlusIcon } from '../Icons/PlusIcon'
import { QnAWidget } from '../QnAWidget'
import { SearchAndFilter } from '../SearchAndFilter'
import { SettingsButton } from '../SettingsButton'
import { Row } from '../StyledComponents'
import { Tile } from '../Tile'

export type SidebarProps = {
  filteredQnAs: (QnAType & { polls: PollType[] })[]
  stats: {
    all: number
    active: number
  }
  filter: QnAFilterTypeEnum
  activeItemId?: number
  expandedQnAIds: Set<number>
  onFilterChange: (filter: QnAFilterTypeEnum) => void
  onQnAClick: (qnaId: number) => void
  onPollClick: (pollId: number) => void
  onHeaderClick: (qnaId: number) => void
  onSearch?: (query: string) => void
  onStatusFilterChange?: (value: string | number) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  filteredQnAs,
  stats,
  filter,
  activeItemId,
  expandedQnAIds,
  onFilterChange,
  onQnAClick,
  onPollClick,
  onHeaderClick,
  onSearch = () => {},
  onStatusFilterChange = () => {},
}) => {
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
              data: stats.all,
              size: 'large',
              isActive: filter === QnAFilterTypeEnum.All,
              onClick: () => onFilterChange(QnAFilterTypeEnum.All),
            },
            {
              label: 'Active',
              data: stats.active,
              size: 'large',
              isActive: filter === QnAFilterTypeEnum.Active,
              onClick: () => onFilterChange(QnAFilterTypeEnum.Active),
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
          onSearch={onSearch}
          onFilterChange={onStatusFilterChange}
        />
        <QnaWidgetContainer>
          {filteredQnAs.map((qna) => (
            <QnAWidget
              key={qna.id}
              qnaData={qna}
              pollsData={qna.polls}
              activeItemId={activeItemId}
              isExpanded={expandedQnAIds.has(qna.id)}
              onHeaderClick={() => onHeaderClick(qna.id)}
              onQnAClick={onQnAClick}
              onPollClick={onPollClick}
              isLive={qna.isActive}
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
  width: 100%;
  gap: 24px;
  min-height: 0;
`

const QnaWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
