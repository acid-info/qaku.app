import { PollOptions } from '@/components/PollOptions'
import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { TitleBlock } from '@/components/TitleBlock'
import { loadPollOptions } from '@/utils/api.utils'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect, useMemo } from 'react'
import { pollOptionsRecordAtom } from '../../../atoms/pollOptionAtom'
import {
  pollWithOptionsAtom,
  qnaCountsByIdAtom,
} from '../../../atoms/selectors'
import { usePollOptions } from '../../../hooks/usePollOptions'

const emptyCountsAtom = atom({
  questionsCount: 0,
  namedAuthorCount: 0,
  anonymousRate: 0,
})

export type PollCreatedProps = {
  pollId: number
}

export const PollCreated: React.FC<PollCreatedProps> = ({ pollId }) => {
  const setPollOptionsRecord = useSetAtom(pollOptionsRecordAtom)

  useEffect(() => {
    loadPollOptions(pollId, setPollOptionsRecord)
  }, [pollId, setPollOptionsRecord])

  const pollDataAtom = useMemo(() => pollWithOptionsAtom(pollId), [pollId])

  const pollData = useAtomValue(pollDataAtom)

  const pollOptionsResult = usePollOptions(pollId)
  const optionsWithStats = useMemo(() => {
    return pollOptionsResult?.optionsWithStats || []
  }, [pollOptionsResult])

  const qnaCountsAtom = useMemo(
    () =>
      pollData?.qnaId ? qnaCountsByIdAtom(pollData.qnaId) : emptyCountsAtom,
    [pollData?.qnaId],
  )
  const qnaCounts = useAtomValue(qnaCountsAtom) || {
    questionsCount: 0,
    namedAuthorCount: 0,
    anonymousRate: 0,
  }

  const mappedOptions = useMemo(() => {
    if (pollData && optionsWithStats.length > 0) {
      return mapPollOptionsForDisplay(
        optionsWithStats,
        pollData.hasCorrectAnswers,
        pollData.correctAnswersIds,
      )
    }
    return []
  }, [pollData, optionsWithStats])

  if (!pollData) {
    return null
  }

  return (
    <Wrapper>
      <Main>
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
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const QnaCreatedHeaderStyled = styled(QnaCreatedHeader)`
  padding: 16px 16px 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  width: 507px;
`
