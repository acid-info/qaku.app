import { PollOptions } from '@/components/PollOptions'
import { QnaCreatedHeader } from '@/components/QnaCreatedHeader/QnaCreatedHeader'
import { TitleBlock } from '@/components/TitleBlock'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import {
  pollWithOptionsAtom,
  qnaCountsByIdAtom,
} from '../../../atoms/selectors'
import { userAtom } from '../../../atoms/userAtom'

const emptyPollAtom = atom(undefined)
const emptyCountsAtom = atom({
  questionsCount: 0,
  namedAuthorCount: 0,
  anonymousRate: 0,
})

export const PollCreated: React.FC = () => {
  const router = useRouter()
  const user = useAtomValue(userAtom)

  const pollId = useMemo(() => {
    const id = router.query.id
    return typeof id === 'string' ? parseInt(id, 10) || null : null
  }, [router.query.id])

  const pollDataAtom = useMemo(
    () => (pollId !== null ? pollWithOptionsAtom(pollId) : emptyPollAtom),
    [pollId],
  )

  const pollData = useAtomValue(pollDataAtom)

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

  const mappedOptions = useMemo(
    () => mapPollOptionsForDisplay(pollData),
    [pollData],
  )

  if (!router.isReady || pollId === null || !pollData) {
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
