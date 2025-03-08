import { PollType } from '@/types/qna.types'
import {
  BaseFloatingPanelPropsInterface,
  ResultVisibilityEnum,
  SaveHandlerType,
} from '@/types/settings.types'
import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { StyledInput } from '../StyledComponents'
import { Tab } from '../Tab'
import { ToggleButton } from '../ToggleButton'
import { FloatingPanel } from './FloatingPanel'
import { SettingField } from './SettingItem'
import {
  ActionBar,
  PanelContent,
  SettingGroup,
  SettingStack,
} from './styledComponents'

export interface PollFloatingPanelEditProps
  extends BaseFloatingPanelPropsInterface {
  poll: PollType
  onSave: SaveHandlerType<Partial<PollType>>
}

export const PollFloatingPanelEdit: React.FC<PollFloatingPanelEditProps> = ({
  isOpen,
  onClose,
  poll,
  onSave,
}) => {
  const [values, setValues] = useState<{
    hasMultipleOptionsSelect: boolean
    hasCorrectAnswers: boolean
    isResultVisible: boolean
    title: string
    showDescription: boolean
    description: string | undefined
  }>({
    hasMultipleOptionsSelect: false,
    hasCorrectAnswers: false,
    isResultVisible: true,
    title: '',
    showDescription: false,
    description: '',
  })

  useEffect(() => {
    if (isOpen && poll) {
      setValues({
        hasMultipleOptionsSelect: poll.hasMultipleOptionsSelect,
        hasCorrectAnswers: poll.hasCorrectAnswers,
        isResultVisible: poll.isResultVisible,
        title: poll.title,
        showDescription: !!poll.description,
        description: poll.description || '',
      })
    }
  }, [isOpen, poll])

  const handleSave = () => {
    const updatedPoll: Partial<PollType> = {
      hasMultipleOptionsSelect: values.hasMultipleOptionsSelect,
      hasCorrectAnswers: values.hasCorrectAnswers,
      isResultVisible: values.isResultVisible,
      title: values.title,
    }

    if (
      values.showDescription &&
      values.description &&
      values.description.trim() !== ''
    ) {
      updatedPoll.description = values.description
    } else {
      updatedPoll.description = undefined
    }

    onSave(updatedPoll)
    onClose()
  }

  const handleClose = () => {
    if (poll) {
      setValues({
        hasMultipleOptionsSelect: poll.hasMultipleOptionsSelect,
        hasCorrectAnswers: poll.hasCorrectAnswers,
        isResultVisible: poll.isResultVisible,
        title: poll.title,
        showDescription: !!poll.description,
        description: poll.description || '',
      })
    }
    onClose()
  }

  return (
    <FloatingPanel title="Poll settings" isOpen={isOpen} onClose={handleClose}>
      <PanelContent>
        <SettingGroup>
          <SettingField
            title="Multiple options"
            description="Participants can select more than one option"
            isRow
          >
            <ToggleButton
              isOn={values.hasMultipleOptionsSelect}
              onChange={(isOn) =>
                setValues((prev) => ({
                  ...prev,
                  hasMultipleOptionsSelect: isOn,
                }))
              }
            />
          </SettingField>

          <SettingField
            title="Mark correct answer"
            description="Select and show the correct answer to participants"
            isRow
          >
            <ToggleButton
              isOn={values.hasCorrectAnswers}
              onChange={(isOn) =>
                setValues((prev) => ({ ...prev, hasCorrectAnswers: isOn }))
              }
            />
          </SettingField>
        </SettingGroup>

        <SettingStack>
          <SettingField
            title="Poll result"
            description="Participants will see the results after they vote"
          >
            <Tab
              variant="secondary"
              options={[
                { id: ResultVisibilityEnum.Visible, label: 'Visible' },
                { id: ResultVisibilityEnum.Hidden, label: 'Hidden' },
              ]}
              activeId={values.isResultVisible ? 'visible' : 'hidden'}
              onChange={(id) =>
                setValues((prev) => ({
                  ...prev,
                  isResultVisible: id === 'visible',
                }))
              }
            />
          </SettingField>
        </SettingStack>

        <SettingGroup>
          <SettingStack>
            <SettingField title="Poll title" description="Edit your title">
              <StyledInput
                placeholder="Type something here.."
                value={values.title}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </SettingField>
          </SettingStack>

          <SettingField
            title="Poll description"
            description="Add a description"
            isRow
          >
            <ToggleButton
              isOn={values.showDescription}
              onChange={(isOn) => {
                if (!isOn) {
                  setValues((prev) => ({
                    ...prev,
                    showDescription: isOn,
                    description: '',
                  }))
                } else {
                  setValues((prev) => ({ ...prev, showDescription: isOn }))
                }
              }}
            />
          </SettingField>
          {values.showDescription && (
            <StyledInput
              placeholder="Type something here.."
              value={values.description || ''}
              onChange={(e) => {
                const newDescription = e.target.value
                setValues((prev) => ({
                  ...prev,
                  description: newDescription,
                }))
              }}
            />
          )}
        </SettingGroup>

        <ActionBar>
          <Button variant="filledPrimary" onClick={handleSave}>
            Save
          </Button>
        </ActionBar>
      </PanelContent>
    </FloatingPanel>
  )
}
