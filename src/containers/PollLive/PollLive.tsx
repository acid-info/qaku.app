import { PollOptions } from '@/components/PollOptions'
import { TitleBlock } from '@/components/TitleBlock'
import styled from '@emotion/styled'
import React from 'react'

export const PollLive: React.FC = () => {
  const options = [
    {
      id: '1',
      title: 'Option 1',
      percentage: 65,
      isChecked: false,
    },
    {
      id: '2',
      title: 'Option 2',
      percentage: 20,
      isChecked: false,
    },
    {
      id: '3',
      title: 'Option 3',
      percentage: 5,
      isChecked: false,
    },
    {
      id: '4',
      title: 'Option 4',
      percentage: 10,
      isChecked: false,
    },
    {
      id: '5',
      title: 'Option 5',
      percentage: 0,
      isChecked: false,
    },
  ]

  return (
    <Main className="scrollable-container">
      <Content>
        <TitleBlock
          title="What is the best approach here? Are there any alternatives?"
          description="Long description visible to all participants and everyone"
        />
        <PollOptions options={options} />
      </Content>
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 507px;
`
