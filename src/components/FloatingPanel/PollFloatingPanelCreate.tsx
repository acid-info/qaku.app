import { defaultPollSettings } from '@/../atoms/settings'
import {
  BaseFloatingPanelPropsInterface,
  PollSettingsInterface,
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

export interface PollFloatingPanelCreateProps
  extends BaseFloatingPanelPropsInterface {
  initialValues?: Partial<PollSettingsInterface>
  onSave: SaveHandlerType<PollSettingsInterface>
}

export const PollFloatingPanelCreate: React.FC<
  PollFloatingPanelCreateProps
> = ({ isOpen, onClose, initialValues, onSave }) => {
  const [values, setValues] = useState<PollSettingsInterface>({
    ...defaultPollSettings,
    ...initialValues,
  })

  useEffect(() => {
    if (isOpen && initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }))
    }
  }, [isOpen, initialValues])

  const handleMultipleOptionsToggle = (isOn: boolean) => {
    setValues((prev) => ({ ...prev, multipleOptions: isOn }))
  }

  const handleMarkCorrectAnswerToggle = (isOn: boolean) => {
    setValues((prev) => ({ ...prev, markCorrectAnswer: isOn }))
  }

  const handleResultVisibilityChange = (id: string | number) => {
    setValues((prev) => ({
      ...prev,
      resultVisibility: id as ResultVisibilityEnum,
    }))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value || defaultPollSettings.title
    setValues((prev) => ({ ...prev, title: newTitle }))
  }

  const handleDescriptionToggle = (isOn: boolean) => {
    if (!isOn) {
      setValues((prev) => ({
        ...prev,
        showDescription: isOn,
        description: '',
      }))
    } else {
      setValues((prev) => ({ ...prev, showDescription: isOn }))
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }

  const handleSave = () => {
    if (values.description.trim() === '') {
      const updatedValues = {
        ...values,
        showDescription: false,
        description: '',
      }
      setValues(updatedValues)
      onSave(updatedValues)
    } else {
      onSave(values)
    }
    onClose()
  }

  const handleClose = () => {
    if (initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }))
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
              isOn={values.multipleOptions}
              onChange={handleMultipleOptionsToggle}
            />
          </SettingField>

          <SettingField
            title="Mark correct answer"
            description="Select and show the correct answer to participants"
            isRow
          >
            <ToggleButton
              isOn={values.markCorrectAnswer}
              onChange={handleMarkCorrectAnswerToggle}
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
              activeId={values.resultVisibility}
              onChange={handleResultVisibilityChange}
            />
          </SettingField>
        </SettingStack>

        <SettingGroup>
          <SettingStack>
            <SettingField title="Poll title" description="Edit your title">
              <StyledInput
                placeholder="Type something here.."
                value={values.title}
                onChange={handleTitleChange}
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
              onChange={handleDescriptionToggle}
            />
          </SettingField>
          {values.showDescription && (
            <StyledInput
              placeholder="Type something here.."
              value={values.description}
              onChange={handleDescriptionChange}
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
