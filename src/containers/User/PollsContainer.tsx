import { Button } from '@/components/Button'
import { PollOptions } from '@/components/PollOptions'
import { Row } from '@/components/StyledComponents'
import { Tab } from '@/components/Tab'
import { TitleBlock } from '@/components/TitleBlock'
import styled from '@emotion/styled'
import React, { useState } from 'react'

const polls = [
  {
    id: '1',
    label: 'What is the best approach here? Are there any alternatives?',
    description: 'Long description visible to all participants and everyone',
  },
  { id: '2', label: 'Poll 2', description: '2' },
  { id: '3', label: 'Poll 3', description: '3' },
]

export const PollsContainer: React.FC = () => {
  const [activePollId, setActivePollId] = useState<string>('1')
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([])

  const handleSelectedPollTitle = (id: string) => {
    return polls.find((option) => option.id === id)?.label ?? ''
  }

  const handleSelectedPollDescription = (id: string) => {
    return polls.find((option) => option.id === id)?.description ?? ''
  }

  return (
    <Wrapper>
      <PollList>
        <StyledTab
          options={polls}
          activeId={activePollId}
          onChange={(id) => setActivePollId(id as string)}
          variant="secondary"
        />
      </PollList>
      <Main className="scrollable-container">
        <Column>
          <TitleBlock
            title={handleSelectedPollTitle(activePollId)}
            description={handleSelectedPollDescription(activePollId)}
          />
          <PollsWrapper>
            <PollOptions
              options={options}
              selectedOptionIds={selectedOptionIds}
              onOptionSelect={(optionId) => setSelectedOptionIds([optionId])}
            />
          </PollsWrapper>
          {selectedOptionIds.length > 0 && (
            <SelectContainer>
              <Row gap={0}>
                <ActionButton variant="filled">Cancel</ActionButton>
                <ActionButton variant="filledPrimary">Send</ActionButton>
              </Row>
              <div>
                <p className="connect-wallet">
                  Voting as Anonymous. <span>Connect Wallet</span>
                </p>
              </div>
            </SelectContainer>
          )}
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
  position: relative;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const PollList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: var(--navbar-main-gap);
  left: 0;
  width: 224px;

  & > div {
    width: 100%;
  }
`

const StyledTab = styled(Tab)`
  flex-direction: column;

  & > div:not(:first-of-type) {
    margin-top: -1px;
  }

  button {
    padding: 16px;
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
    max-width: 100%;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 507px;
`

const PollsWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
`

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  width: 204px;
  margin: 32px auto 0;

  .connect-wallet {
    opacity: 0.7;
    font-size: var(--label1-font-size);
    line-height: var(--label1-line-height);

    span {
      text-decoration: underline;
    }
  }
`

const ActionButton = styled(Button)`
  width: 100px;
  height: 32px;
`

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
    isChecked: true,
  },
  {
    id: '4',
    title: 'Do nothing',
    percentage: 0,
    isChecked: false,
  },
  {
    id: '5',
    title: 'Other',
    percentage: 0,
    isChecked: true,
  },
  {
    id: '6',
    title: 'Other 2',
    percentage: 10,
    isChecked: false,
  },
  {
    id: '7',
    title: 'Other 3',
    percentage: 30,
    isChecked: false,
  },
]
