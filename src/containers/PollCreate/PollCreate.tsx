import { defaultPollSettings, pollSettingsAtom } from '@/../atoms/settings'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { IconButtonRound } from '@/components/IconButtonRound'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { SettingsIcon } from '@/components/Icons/SettingsIcon'
import MobileOnly from '@/components/MobileOnly/MobileOnly'
import { PollOptions } from '@/components/PollOptions'
import { ActionContainer, StyledInput } from '@/components/StyledComponents'
import { breakpoints } from '@/configs/ui.configs'
import { POLL } from '@/data/routes'
import { createNewPoll } from '@/utils/api.utils'
import { mapPollDataForCreation } from '@/utils/poll.utils'
import styled from '@emotion/styled'
import { useAtom, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'

export const PollCreate: React.FC = () => {
  const router = useRouter()
  const { qnaId } = router.query
  const [nextId, setNextId] = useState(3)
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')
  const [pollSettings, setPollSettings] = useAtom(pollSettingsAtom)
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setIsSettingsPanelOpen = useSetAtom(isSettingsPanelOpenAtom)

  const [options, setOptions] = useState([
    {
      id: '1',
      title: 'Option 1',
      percentage: 0,
      isChecked: false,
    },
    {
      id: '2',
      title: 'Option 2',
      percentage: 0,
      isChecked: false,
    },
  ])

  useEffect(() => {
    if (pollSettings.markCorrectAnswer) {
      setOptions((prevOptions) =>
        prevOptions.map((option) => ({
          ...option,
          isChecked: correctAnswers.includes(option.id),
        })),
      )
    }
  }, [correctAnswers, pollSettings.markCorrectAnswer])

  useEffect(() => {
    setDescription(pollSettings.description)
  }, [pollSettings])

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newDescription = e.target.value
    setDescription(newDescription)
    setPollSettings((prev) => ({
      ...prev,
      description: newDescription,
      showDescription: newDescription.trim() !== '',
    }))
  }

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: nextId.toString(),
        title: `Option ${nextId}`,
        percentage: 0,
        isChecked: false,
      },
    ])
    setNextId(nextId + 1)
  }

  const handleRemoveOption = (optionId: string) => {
    setOptions(options.filter((option) => option.id !== optionId))
    if (correctAnswers.includes(optionId)) {
      setCorrectAnswers(correctAnswers.filter((id) => id !== optionId))
    }
  }

  const handleOptionTitleChange = (optionId: string, title: string) => {
    setOptions(
      options.map((option) =>
        option.id === optionId ? { ...option, title } : option,
      ),
    )
  }

  const handleOptionSelect = (optionId: string) => {
    if (!pollSettings.markCorrectAnswer) return

    if (pollSettings.multipleOptions) {
      setCorrectAnswers((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId],
      )
    } else {
      setCorrectAnswers([optionId])
    }
  }

  const handleCreatePoll = async () => {
    if (!qnaId) {
      setError('Missing Q&A ID')
      return
    }

    if (!question.trim()) {
      setError('Please provide a question for your poll')
      return
    }

    if (options.length < 2) {
      setError('Please add at least 2 options')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { pollData, pollOptions } = mapPollDataForCreation({
        title: pollSettings.title || defaultPollSettings.title,
        question,
        description: description || undefined,
        qnaId: String(qnaId),
        correctAnswers,
        markCorrectAnswer: pollSettings.markCorrectAnswer,
        multipleOptions: pollSettings.multipleOptions,
        resultVisibility: pollSettings.resultVisibility,
        options,
      })

      const response = await createNewPoll(pollData, pollOptions)

      if (response.success && response.data) {
        resetFormData()
        router.push(POLL.LIVE.replace(':id', String(response.data.id)))
      } else {
        setError(response.error || 'Failed to create poll')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Error creating poll:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetFormData = () => {
    setQuestion('')
    setDescription('')
    setCorrectAnswers([])
    setOptions([
      {
        id: '1',
        title: 'Option 1',
        percentage: 0,
        isChecked: false,
      },
      {
        id: '2',
        title: 'Option 2',
        percentage: 0,
        isChecked: false,
      },
    ])
    setNextId(3)
    setPollSettings(() => ({ ...defaultPollSettings }))
  }

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Content>
          {error && <Badge title={error} variant="red" />}
          <Top>
            <TitleWithInput>
              <h3>What would you like to ask?</h3>
              <StyledInput
                placeholder="Type something here.."
                value={question}
                onChange={handleQuestionChange}
              />
            </TitleWithInput>
            <Collapsible title="Add description">
              <textarea
                style={{ height: '100px' }}
                placeholder="Type something here.."
                value={description}
                onChange={handleDescriptionChange}
              />
            </Collapsible>
          </Top>
          <Bottom>
            {pollSettings.markCorrectAnswer && (
              <StyledBadge
                title="Don't forget to mark the correct answer"
                variant="green"
              />
            )}
            <PollOptions
              hasInput={true}
              options={options}
              onRemove={handleRemoveOption}
              hasCheckbox={pollSettings.markCorrectAnswer}
              selectedOptionIds={correctAnswers}
              onOptionSelect={handleOptionSelect}
              onOptionTitleChange={handleOptionTitleChange}
            />
            <IconButtonRound
              size="large"
              variant="filled"
              icon={<PlusIcon />}
              onClick={handleAddOption}
            />
          </Bottom>
        </Content>
      </Main>
      <ActionContainer>
        <StyledButton
          variant="filledPrimary"
          size="large"
          onClick={handleCreatePoll}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </StyledButton>
        <MobileOnly>
          <MobileButtonsContainer>
            <IconButtonRound
              icon={<SettingsIcon />}
              onClick={() => setIsSettingsPanelOpen(true)}
            />
          </MobileButtonsContainer>
        </MobileOnly>
      </ActionContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 16px;
  }
`

const Main = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 507px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const TitleWithInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    margin-bottom: 0px !important;
  }
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const StyledBadge = styled(Badge)`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 200px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const MobileButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
