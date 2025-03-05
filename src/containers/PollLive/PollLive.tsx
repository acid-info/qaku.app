import { PollOptions } from '@/components/PollOptions'
import { TitleBlock } from '@/components/TitleBlock'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import React, { useMemo } from 'react'
import { getPollByIdAtom } from '../../../atoms/pollAtom'
import { usePollOptions } from '../../../hooks/usePollOptions'
import { usePollSubscriptions } from '../../../hooks/usePollSubscriptions'

export type PollLiveProps = {
  pollId: number
}

export const PollLive: React.FC<PollLiveProps> = ({ pollId }) => {
  usePollSubscriptions(pollId)

  const pollAtom = useMemo(() => getPollByIdAtom(pollId), [pollId])
  const poll = useAtomValue(pollAtom)
  const { optionsWithStats } = usePollOptions(pollId)

  const formattedOptions = useMemo(
    () =>
      mapPollOptionsForDisplay(
        optionsWithStats,
        poll?.hasCorrectAnswers,
        poll?.correctAnswersIds,
      ),
    [optionsWithStats, poll?.hasCorrectAnswers, poll?.correctAnswersIds],
  )

  return (
    <Main className="scrollable-container">
      <Content>
        <TitleBlock
          title={poll?.question || ''}
          description={poll?.description || ''}
        />

        <PollOptions
          options={formattedOptions}
          hasCheckbox={poll?.hasCorrectAnswers}
          selectedOptionIds={poll?.correctAnswersIds?.map(String)}
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
