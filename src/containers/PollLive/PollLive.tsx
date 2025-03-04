import { PollOptions } from '@/components/PollOptions'
import { TitleBlock } from '@/components/TitleBlock'
import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import React from 'react'
import { getPollByIdAtom } from '../../../atoms/pollAtom'
import { usePollOptions } from '../../../hooks/usePollOptions'
import { usePollSubscriptions } from '../../../hooks/usePollSubscriptions'

export type PollLiveProps = {
  pollId: number
}

export const PollLive: React.FC<PollLiveProps> = ({ pollId }) => {
  usePollSubscriptions(pollId)
  const poll = useAtomValue(getPollByIdAtom(pollId))
  const { optionsWithStats } = usePollOptions(pollId)

  // Todo move to utils
  const formattedOptions = optionsWithStats.map((option: any) => ({
    id: option.id.toString(),
    title: option.title,
    percentage: option.percentage,
    isChecked: false,
  }))

  return (
    <Main className="scrollable-container">
      <Content>
        <TitleBlock
          title={poll?.question || ''}
          description={poll?.description || ''}
        />

        <PollOptions
          options={formattedOptions}
          selectedOptionIds={[]}
          onOptionSelect={() => {}}
          hasCheckbox={false}
        />
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
