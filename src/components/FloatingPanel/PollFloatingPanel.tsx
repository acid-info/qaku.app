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

export interface PollFloatingPanelProps
  extends BaseFloatingPanelPropsInterface {
  initialValues?: Partial<PollSettingsInterface>
  onSave: SaveHandlerType<PollSettingsInterface>
}

export const PollFloatingPanel: React.FC<PollFloatingPanelProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSave,
}) => {
  const [values, setValues] = useState<PollSettingsInterface>({
    multipleOptions: false,
    markCorrectAnswer: false,
    resultVisibility: ResultVisibilityEnum.Visible,
    title: '',
    showDescription: false,
    description: '',
    ...initialValues,
  })

  useEffect(() => {
    if (isOpen && initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }))
    }
  }, [isOpen, initialValues])

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
              onChange={(isOn) =>
                setValues((prev) => ({ ...prev, multipleOptions: isOn }))
              }
            />
          </SettingField>

          <SettingField
            title="Mark correct answer"
            description="Select and show the correct answer to participants"
            isRow
          >
            <ToggleButton
              isOn={values.markCorrectAnswer}
              onChange={(isOn) =>
                setValues((prev) => ({ ...prev, markCorrectAnswer: isOn }))
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
              activeId={values.resultVisibility}
              onChange={(id) =>
                setValues((prev) => ({
                  ...prev,
                  resultVisibility: id as ResultVisibilityEnum,
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
              value={values.description}
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
