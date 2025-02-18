import styled from '@emotion/styled'
import React from 'react'
import { QnAWidget } from '../QnAWidget'
import { SearchAndFilter } from '../SearchAndFilter'
import { Tile } from '../Tile'

export const QnaCreateSidebar: React.FC = () => {
  const demoQnA = {
    id: 'qna-1',
    title: 'New Qaku',
  }
  const polls: { id: string; title: string }[] = []

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Your Q&As</Title>
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
          qnaData={demoQnA}
          pollsData={polls}
          activeItemId="qna-1"
          onQnAClick={() => {}}
          onPollClick={() => {}}
          hasPlusButton
          isDefaultExpanded
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
  justify-content: flex-start;
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
