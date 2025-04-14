import { PollWithOptionsType } from '@/../atoms/selectors'
import { usePollOptions } from '@/../hooks/usePollOptions'
import { PollOptions } from '@/components/PollOptions'
import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { TitleBlock } from '@/components/TitleBlock'
import { breakpoints } from '@/configs/ui.configs'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'

const CONTENT_WIDTH = 507

type QnaCountsType = {
  questionsCount: number
  namedAuthorCount: number
  anonymousRate: number
}

export type PollCreatedProps = {
  pollId: string
  pollData: PollWithOptionsType
  qnaCounts: QnaCountsType
}

export const PollCreated: React.FC<PollCreatedProps> = ({
  pollId,
  pollData,
  qnaCounts,
}) => {
  const pollOptionsResult = usePollOptions(pollId)
  const optionsWithStats = useMemo(() => {
    return pollOptionsResult?.optionsWithStats || []
  }, [pollOptionsResult])

  const mappedOptions = useMemo(() => {
    if (optionsWithStats.length === 0) {
      return []
    }

    return mapPollOptionsForDisplay({
      optionsWithStats,
      hasCorrectAnswers: pollData.hasCorrectAnswers,
      correctAnswersIds: pollData.correctAnswersIds,
    })
  }, [pollData, optionsWithStats])

  return (
    <Wrapper>
      <Main>
        <ScrollWrapper>
          <QnaCreatedHeaderStyled
            questionsCount={qnaCounts.questionsCount}
            anonymousRate={qnaCounts.anonymousRate}
            namedAuthorCount={qnaCounts.namedAuthorCount}
          />
          <Content>
            <TitleBlock
              title={pollData.question}
              description={pollData.description || ''}
            />
            <PollOptions
              options={mappedOptions}
              hasCheckbox={pollData.hasCorrectAnswers}
              selectedOptionIds={pollData.correctAnswersIds?.map(String)}
            />
          </Content>
        </ScrollWrapper>
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 16px;
  }
`

const Main = styled.div`
  height: 100%;
  width: 100%;
`

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  overflow-y: auto;

  @media (max-width: ${breakpoints.sm}px) {
    padding-top: 40px;
    padding-bottom: 140px;
  }
`

const QnaCreatedHeaderStyled = styled(QnaCreatedHeader)`
  padding: 16px 16px 0;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  width: ${CONTENT_WIDTH}px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`
