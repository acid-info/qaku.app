import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { IconButtonRound } from '@/components/IconButtonRound'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { PollOptions } from '@/components/PollOptions'
import { ActionContainer, StyledInput } from '@/components/StyledComponents'
import styled from '@emotion/styled'
import Link from 'next/link'
import React, { useState } from 'react'

export const PollCreate: React.FC = () => {
  const [nextId, setNextId] = useState(3)
  const [options, setOptions] = useState([
    {
      id: '1',
      title: 'Option 1',
      percentage: 0,
      isChecked: false,
    },
    {
      id: '2',
      title: 'Option 2',
      percentage: 0,
      isChecked: false,
    },
  ])

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: nextId.toString(),
        title: `Option ${nextId}`,
        percentage: 0,
        isChecked: false,
      },
    ])
    setNextId(nextId + 1)
  }

  const handleRemoveOption = (optionId: string) => {
    setOptions(options.filter((option) => option.id !== optionId))
  }

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Content>
          <Top>
            <TitleWithInput>
              <h3>What would you like to ask?</h3>
              <StyledInput placeholder="Type something here.." />
            </TitleWithInput>
            <Collapsible title="Add description">
              <textarea
                style={{ height: '100px' }}
                placeholder="Type something here.."
              />
            </Collapsible>
          </Top>
          <Bottom>
            <PollOptions
              hasInput={true}
              options={options}
              onRemove={handleRemoveOption}
            />
            <IconButtonRound
              size="large"
              variant="filled"
              icon={<PlusIcon />}
              onClick={handleAddOption}
            />
          </Bottom>
        </Content>
      </Main>
      <ActionContainer>
        <Link href="/poll/live">
          <StyledButton variant="filledPrimary" size="large">
            Create
          </StyledButton>
        </Link>
      </ActionContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Main = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 507px;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const TitleWithInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    margin-bottom: 0px !important;
  }
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const StyledButton = styled(Button)`
  width: 200px;
`
