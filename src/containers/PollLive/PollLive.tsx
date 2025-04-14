import { usePollOptions } from '@/../hooks/usePollOptions'
import { PollOptions } from '@/components/PollOptions'
import { TitleBlock } from '@/components/TitleBlock'
import { breakpoints } from '@/configs/ui.configs'
import { PollType } from '@/types/qna.types'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'

const CONTENT_WIDTH = 507

export type PollLiveProps = {
  pollId: string
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

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 16px;
    padding-top: 40px !important;
    padding-bottom: 140px !important;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: ${CONTENT_WIDTH}px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`
