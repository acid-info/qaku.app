import { getPollByIdAtom, pollsRecordAtom } from '@/../atoms/poll'
import { walletStateAtom } from '@/../atoms/wallet'
import { usePollOptions } from '@/../hooks/usePollOptions'
import { usePollSubscriptions } from '@/../hooks/usePollSubscriptions'
import { useWalletConnection } from '@/../hooks/useWalletConnection'
import DesktopOnly from '@/components/DesktopOnly/DesktopOnly'
import { UserNavMobileBottomPanel } from '@/components/MobileBottomPanel'
import { PollOptions } from '@/components/PollOptions'
import { Tab } from '@/components/Tab'
import { TitleBlock } from '@/components/TitleBlock'
import { breakpoints } from '@/configs/ui.configs'
import { NavbarModeEnum } from '@/types/navbar.types'
import { QnAType } from '@/types/qna.types'
import { voteInPoll } from '@/utils/api.utils'
import { mapPollOptionsForDisplay } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import UserVote from './UserVote'

const BACKUP_POLL_ID = '0'

export type PollsUserProps = {
  qnaId: string
  qna?: QnAType | null
  pollIds: string[]
}

export const PollsUser: React.FC<PollsUserProps> = ({
  qnaId,
  qna,
  pollIds,
}) => {
  const { localAddress } = useAtomValue(walletStateAtom)
  const pollsRecord = useAtomValue(pollsRecordAtom)
  const { openWalletPanel, walletState } = useWalletConnection()
  const router = useRouter()

  const [activePollId, setActivePollId] = useState<string | null>(null)
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([])
  const [isAnonymous, setIsAnonymous] = useState(false)

  useEffect(() => {
    if (!pollIds.length || !router.isReady) return

    let newPollId = activePollId

    if (router.query.poll) {
      const pollIdFromUrl = String(router.query.poll)
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
    const pollId = String(id)
    setSelectedOptionIds([])
    setActivePollId(pollId)

    if (router.isReady) {
      const newQuery = { ...router.query, poll: pollId }
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

  usePollSubscriptions(qnaId, activePollId || BACKUP_POLL_ID)

  const { optionsWithStats, isUserVoted } = usePollOptions(
    activePollId || BACKUP_POLL_ID,
  )

  const userHasVoted = useMemo(() => {
    return isUserVoted(localAddress ?? '')
  }, [isUserVoted, localAddress])

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
      const optionIds = selectedOptionIds
      const response = await voteInPoll({
        qnaId,
        pollId: activePollId,
        optionId: parseInt(optionIds[0]),
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
            <DesktopOnly>
              <UserVote
                handleCancelVote={handleCancelVote}
                handleVote={handleVote}
                walletState={walletState}
                openWalletPanel={openWalletPanel}
                userName={localAddress || ''}
                isAnonymous={isAnonymous}
                setIsAnonymous={setIsAnonymous}
              />
            </DesktopOnly>
          )}
        </Column>
      </Main>
      <UserNavMobileBottomPanel
        mode={NavbarModeEnum.Polls}
        title={qna?.title || ''}
        count={pollIds.length}
        id={activePollId || BACKUP_POLL_ID}
      >
        {selectedOptionIds.length > 0 && !userHasVoted && (
          <UserVote
            handleCancelVote={handleCancelVote}
            handleVote={handleVote}
            walletState={walletState}
            openWalletPanel={openWalletPanel}
            userName={localAddress || ''}
            isAnonymous={isAnonymous}
            setIsAnonymous={setIsAnonymous}
          />
        )}
      </UserNavMobileBottomPanel>
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

  @media (max-width: ${breakpoints.sm}px) {
    --button-height: 54px;
    margin-top: calc(var(--button-height) + var(--navbar-main-gap) + 24px);
    padding-top: 0 !important;
  }
`

const PollList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: var(--navbar-main-gap);
  left: 0;

  width: 224px;
  margin-left: 16px;

  & > div {
    width: 100%;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.sm}px) {
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    margin-left: 0;
    top: 0;
  }
`

const StyledTab = styled(Tab)`
  flex-direction: column;
  height: fit-content;

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

  @media (max-width: ${breakpoints.sm}px) {
    flex-direction: row;
    width: fit-content !important;

    button {
      width: 172px;
    }
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 507px;

  @media (max-width: ${breakpoints.sm}px) {
    padding-bottom: 100px;
  }
`

const PollsWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
`
