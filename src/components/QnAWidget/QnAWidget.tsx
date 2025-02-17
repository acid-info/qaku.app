import styled from '@emotion/styled'
import React, { useState } from 'react'

import { pollData, qnaData } from '@/types/qna.types'
import { ChevronDownIcon } from '../Icons/ChevronDownIcon'
import { ChevronUpIcon } from '../Icons/ChevronUpIcon'
import { QnAWidgetItem } from '../QnAWidgetItem/QnAWidgetItem'

export interface QnAWidgetProps {
  qnaData: qnaData
  pollsData?: pollData[]
  isLive?: boolean
  defaultExpanded?: boolean
  activeItemId?: string
  hasPlusButton?: boolean
  onPlusClick?: () => void
  onQnAClick?: (qnaId: string) => void
  onPollClick?: (pollId: string) => void
}

export const QnAWidget: React.FC<QnAWidgetProps> = ({
  qnaData,
  pollsData = [],
  isLive = false,
  defaultExpanded = false,
  hasPlusButton = false,
  activeItemId,
  onPlusClick,
  onQnAClick,
  onPollClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [showAllPolls, setShowAllPolls] = useState(false)

  const visiblePolls = showAllPolls ? pollsData : pollsData.slice(0, 2)
  const hasMorePolls = !hasPlusButton && pollsData.length > 2

  return (
    <Container $isExpanded={isExpanded}>
      <ToggleButton
        $isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        title={qnaData.title}
      >
        <h3>{qnaData.title}</h3>
        {isLive && <LiveBadge />}
      </ToggleButton>
      {isExpanded && (
        <>
          <Content>
            <QnAWidgetItem
              title={'Q&A'}
              variant="text"
              isActive={activeItemId === qnaData.id}
              onClick={() => onQnAClick?.(qnaData.id)}
            />
            <Separator>Polls</Separator>
            <PollsContainer>
              {visiblePolls.map((poll) => (
                <QnAWidgetItem
                  key={poll.id}
                  title={poll.title}
                  variant="text"
                  isActive={activeItemId === poll.id}
                  onClick={() => onPollClick?.(poll.id)}
                />
              ))}
              {hasPlusButton && (
                <QnAWidgetItem variant="icon" isActive onClick={onPlusClick} />
              )}
            </PollsContainer>
          </Content>
          {hasMorePolls && (
            <ShowMoreButton onClick={() => setShowAllPolls(!showAllPolls)}>
              <span>
                {showAllPolls ? 'Show Less' : `${pollsData.length - 2} more`}
              </span>
              {showAllPolls ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ShowMoreButton>
          )}
        </>
      )}
    </Container>
  )
}
const Container = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ $isExpanded }) =>
    $isExpanded ? 'var(--gray-darker)' : 'transparent'};
  border-radius: 8px;
  border: 1px solid transparent;

  ${({ $isExpanded }) =>
    !$isExpanded &&
    `&:hover {
      border: 1px solid var(--gray);
  }`};
`

const ToggleButton = styled.button<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 11px 16px ${({ $isExpanded }) => $isExpanded && '0px'};

  h3 {
    margin-bottom: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Subtract space for LiveBadge (8px) and some padding */
    max-width: calc(100% - 24px);
  }
`

const LiveBadge = styled.div`
  background-color: var(--red);
  border-radius: 99px;
  width: 8px;
  height: 8px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`

const Separator = styled.div`
  width: 100%;
  text-align: center;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  opacity: 0.4;
`

const PollsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > button:not(:first-of-type) {
    margin-top: -1px;
  }
`

const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);

  span {
    opacity: 0.4;
  }

  svg {
    color: var(--white);
  }

  &:hover {
    opacity: 1;
  }
`
