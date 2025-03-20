import { Button } from '@/components/Button'
import { PollOptions } from '@/components/PollOptions'
import { Row } from '@/components/StyledComponents'
import { Tab } from '@/components/Tab'
import { TitleBlock } from '@/components/TitleBlock'
import { voteInPoll } from '@/utils/api.utils'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { getPollByIdAtom, pollsRecordAtom } from '../../../atoms/poll'
import { userAtom } from '../../../atoms/user'
import { usePollOptions } from '../../../hooks/usePollOptions'
import { usePollSubscriptions } from '../../../hooks/usePollSubscriptions'

const BACKUP_POLL_ID = 0

export type PollsUserProps = {
  pollIds: number[]
}

export const PollsUser: React.FC<PollsUserProps> = ({ pollIds }) => {
  const user = useAtomValue(userAtom)
  const pollsRecord = useAtomValue(pollsRecordAtom)
  const router = useRouter()

  const [activePollId, setActivePollId] = useState<number | null>(null)
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([])

  useEffect(() => {
    if (!pollIds.length || !router.isReady) return

    let newPollId = activePollId

    if (router.query.poll) {
      const pollIdFromUrl = parseInt(String(router.query.poll), 10)
      if (pollIds.includes(pollIdFromUrl)) {
        newPollId = pollIdFromUrl
      }
    }

    if (newPollId === null) {
      newPollId = pollIds[0]
    }
    if (newPollId !== activePollId) {
      setActivePollId(newPollId)
    }
  }, [router.isReady, router.query.poll, pollIds, activePollId])

  const handlePollChange = (id: string | number) => {
    const pollId = parseInt(String(id), 10)
    setSelectedOptionIds([])
    setActivePollId(pollId)

    if (router.isReady) {
      const newQuery = { ...router.query, poll: String(pollId) }
      router.push(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true },
      )
    }
  }

  const activePollAtom = useMemo(() => {
    if (!activePollId) return atom(null)
    return getPollByIdAtom(activePollId)
  }, [activePollId])

  const activePoll = useAtomValue(activePollAtom)

  usePollSubscriptions(activePollId || BACKUP_POLL_ID)

  const { optionsWithStats, hasVoted } = usePollOptions(
    activePollId || BACKUP_POLL_ID,
  )

  const userHasVoted = useMemo(() => {
    return hasVoted(user.id)
  }, [hasVoted, user.id])

  const formattedOptions = useMemo(() => {
    if (!activePollId) return []

    const shouldShowCorrectAnswers = Boolean(
      activePoll?.hasCorrectAnswers && userHasVoted,
    )

    return mapPollOptionsForDisplay({
      optionsWithStats,
      hasCorrectAnswers: shouldShowCorrectAnswers,
      correctAnswersIds: activePoll?.correctAnswersIds,
    })
  }, [optionsWithStats, activePoll, activePollId, userHasVoted])

  const pollTabOptions = useMemo(() => {
    return pollIds.map((id) => {
      const poll = pollsRecord[id]
      return {
        id: id.toString(),
        label: poll?.title || poll?.question || `Poll ${id}`,
      }
    })
  }, [pollIds, pollsRecord])

  const handleVote = async () => {
    if (!activePollId || selectedOptionIds.length === 0) return

    try {
      const optionIds = selectedOptionIds.map((id) => parseInt(id, 10))
      const response = await voteInPoll({
        pollId: activePollId,
        optionIds,
        voter: user.id,
      })

      if (response.success) {
        setSelectedOptionIds([])
      } else {
        console.error('Vote failed:', response.error)
      }
    } catch (error) {
      console.error('Error voting in poll:', error)
    }
  }

  const handleCancelVote = () => {
    setSelectedOptionIds([])
  }

  const handleOptionSelect = (optionId: string) => {
    if (userHasVoted) return
    if (!activePoll?.isActive) return

    if (activePoll?.hasMultipleOptionsSelect) {
      // Toggle selection for multiple options
      setSelectedOptionIds((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId],
      )
    } else {
      // Single option selection
      setSelectedOptionIds([optionId])
    }
  }

  if (!activePollId) {
    return null
  }

  return (
    <Wrapper>
      <PollList>
        <StyledTab
          options={pollTabOptions}
          activeId={activePollId?.toString()}
          onChange={handlePollChange}
          variant="secondary"
        />
      </PollList>
      <Main className="scrollable-container">
        <Column>
          <TitleBlock
            title={activePoll?.question || 'Loading...'}
            description={activePoll?.description || ''}
          />
          <PollsWrapper>
            <PollOptions
              options={formattedOptions}
              selectedOptionIds={
                userHasVoted
                  ? activePoll?.correctAnswersIds?.map(String)
                  : selectedOptionIds
              }
              onOptionSelect={handleOptionSelect}
              hasCheckbox={
                (!userHasVoted || activePoll?.hasCorrectAnswers) &&
                activePoll?.isActive
              }
            />
          </PollsWrapper>
          {selectedOptionIds.length > 0 && !userHasVoted && (
            <SelectContainer>
              <Row gap={0}>
                <ActionButton variant="filled" onClick={handleCancelVote}>
                  Cancel
                </ActionButton>
                <ActionButton variant="filledPrimary" onClick={handleVote}>
                  Send
                </ActionButton>
              </Row>
              <div>
                <p className="connect-wallet">
                  Voting as Anonymous. <span>Connect Wallet</span>
                </p>
              </div>
            </SelectContainer>
          )}
        </Column>
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const PollList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: var(--navbar-main-gap);
  left: 0;
  width: 224px;
  margin-left: 16px;

  & > div {
    width: 100%;
  }
`

const StyledTab = styled(Tab)`
  flex-direction: column;

  & > div:not(:first-of-type) {
    margin-top: -1px;
  }

  button {
    padding: 16px;
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
    max-width: 100%;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 507px;
`

const PollsWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
`

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  width: 204px;
  margin: 32px auto 0;

  .connect-wallet {
    opacity: 0.7;
    font-size: var(--label1-font-size);
    line-height: var(--label1-line-height);

    span {
      text-decoration: underline;
    }
  }
`

const ActionButton = styled(Button)`
  width: 100px;
  height: 32px;
`
