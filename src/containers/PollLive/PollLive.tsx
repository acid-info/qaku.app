import { PollOptions } from '@/components/PollOptions'
import { TitleBlock } from '@/components/TitleBlock'
import { PollType } from '@/types/qna.types'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { usePollOptions } from '../../../hooks/usePollOptions'

export type PollLiveProps = {
  pollId: number
  poll: PollType
}

export const PollLive: React.FC<PollLiveProps> = ({ pollId, poll }) => {
  const { optionsWithStats } = usePollOptions(pollId)

  const formattedOptions = useMemo(
    () =>
      mapPollOptionsForDisplay({
        optionsWithStats,
        hasCorrectAnswers: poll?.hasCorrectAnswers,
        correctAnswersIds: poll?.correctAnswersIds,
      }),
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
