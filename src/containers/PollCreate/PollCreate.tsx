import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { IconButtonRound } from '@/components/IconButtonRound'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { Input } from '@/components/Input'
import { PollOptions } from '@/components/PollOptions'
import { ActionContainer } from '@/components/StyledComponents'
import styled from '@emotion/styled'
import Link from 'next/link'
import React, { useState } from 'react'

export const PollCreate: React.FC = () => {
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
    const newId = (options.length + 1).toString()
    setOptions([
      ...options,
      {
        id: newId,
        title: `Option ${newId}`,
        percentage: 0,
        isChecked: false,
      },
    ])
  }

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Top>
          <TitleWithInput>
            <h3>What would you like to ask?</h3>
            <Input placeholder="Type something here.." />
          </TitleWithInput>
          <Collapsible title="Add description">
            <textarea
              style={{ height: '100px' }}
              placeholder="Type something here.."
            />
          </Collapsible>
        </Top>
        <Bottom>
          <PollOptions options={options} />
          <IconButtonRound
            size="large"
            variant="filled"
            icon={<PlusIcon />}
            onClick={handleAddOption}
          />
        </Bottom>
      </Main>
      <ActionContainer>
        <Link href="#">
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
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  width: 507px;
  overflow-y: auto;
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
