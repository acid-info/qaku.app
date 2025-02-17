import styled from '@emotion/styled'
import React, { useState } from 'react'

import { pollData, qnaData } from '@/types/qna.types'
import { ChevronDownIcon } from '../Icons/ChevronDownIcon'
import { ChevronUpIcon } from '../Icons/ChevronUpIcon'
import { QnAWidgetItem } from '../QnAWidgetItem/QnAWidgetItem'

export type QnAWidgetProps = {
  qnaData: qnaData
  pollsData?: pollData[]
  isLive?: boolean
  isDefaultExpanded?: boolean
  activeItemId?: string
  hasPlusButton?: boolean
  onPlusClick?: () => void
  onQnAClick?: (qnaId: string) => void
  onPollClick?: (pollId: string) => void
} & React.HTMLAttributes<HTMLDivElement>

const INITIAL_VISIBLE_POLLS = 2

const PollsList: React.FC<{
  polls: pollData[]
  activeItemId?: string
  onPollClick?: (id: string) => void
  showPlusButton?: boolean
  onPlusClick?: () => void
}> = ({ polls, activeItemId, onPollClick, showPlusButton, onPlusClick }) => (
  <>
    {polls.map((poll) => (
      <QnAWidgetItem
        key={poll.id}
        title={poll.title}
        variant="text"
        isActive={activeItemId === poll.id}
        onClick={() => onPollClick?.(poll.id)}
      />
    ))}
    {showPlusButton && (
      <QnAWidgetItem variant="icon" isActive onClick={onPlusClick} />
    )}
  </>
)

export const QnAWidget: React.FC<QnAWidgetProps> = ({
  qnaData,
  pollsData = [],
  isLive = false,
  isDefaultExpanded = false,
  hasPlusButton = false,
  activeItemId,
  onPlusClick,
  onQnAClick,
  onPollClick,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isDefaultExpanded)
  const [showAllPolls, setShowAllPolls] = useState<boolean>(false)

  const visiblePolls = showAllPolls
    ? pollsData
    : pollsData.slice(0, INITIAL_VISIBLE_POLLS)

  const hasMorePolls = pollsData.length > INITIAL_VISIBLE_POLLS

  const shouldShowPlusButton =
    hasPlusButton && (pollsData.length <= INITIAL_VISIBLE_POLLS || showAllPolls)

  return (
    <Container $isExpanded={isExpanded} {...props}>
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
              title="Q&A"
              variant="text"
              isActive={activeItemId === qnaData.id}
              onClick={() => onQnAClick?.(qnaData.id)}
            />
            <Separator>Polls</Separator>
            <PollsContainer>
              <PollsList
                polls={visiblePolls}
                activeItemId={activeItemId}
                onPollClick={onPollClick}
                showPlusButton={shouldShowPlusButton}
                onPlusClick={onPlusClick}
              />
            </PollsContainer>
          </Content>

          {hasMorePolls && (
            <ShowMoreButton onClick={() => setShowAllPolls(!showAllPolls)}>
              <span>
                {showAllPolls
                  ? 'Show Less'
                  : `${pollsData.length - INITIAL_VISIBLE_POLLS} more`}
              </span>
              {showAllPolls ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ShowMoreButton>
          )}
        </>
      )}
    </Container>
  )
}

const baseButtonStyles = `
  display: flex;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
`

const Container = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ $isExpanded }) =>
    $isExpanded ? 'var(--gray-darker)' : 'transparent'};
  border-radius: 8px;
  border: 1px solid transparent;
  ${({ $isExpanded }) =>
    !$isExpanded && '&:hover { border: 1px solid var(--gray); }'}
`

const ToggleButton = styled.button<{ $isExpanded: boolean }>`
  ${baseButtonStyles}
  justify-content: space-between;
  padding: 11px 16px ${({ $isExpanded }) => $isExpanded && '0px'};

  h3 {
    margin-bottom: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  ${baseButtonStyles}
  justify-content: space-between;
  padding: 0 16px 16px;
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
