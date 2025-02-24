import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { StyledInput } from '../StyledComponents'
import { Tab } from '../Tab'
import { ToggleButton } from '../ToggleButton'
import { FloatingPanel } from './FloatingPanel'
import { SettingField } from './SettingItem'
import { ActionBar, PanelContent, SettingGroup, SettingStack } from './styles'
import {
  BaseFloatingPanelProps,
  PollSettings,
  ResultVisibility,
  SaveHandler,
} from './types'

export interface PollFloatingPanelProps extends BaseFloatingPanelProps {
  initialValues?: Partial<PollSettings>
  onSave: SaveHandler<PollSettings>
}

export const PollFloatingPanel: React.FC<PollFloatingPanelProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSave,
}) => {
  const [values, setValues] = useState<PollSettings>({
    multipleOptions: true,
    markCorrectAnswer: true,
    resultVisibility: ResultVisibility.Visible,
    title: '',
    showDescription: false,
    description: '',
    ...initialValues,
  })

  useEffect(() => {
    if (initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }))
    }
  }, [initialValues])

  const handleSave = () => {
    onSave(values)
    onClose()
  }

  return (
    <FloatingPanel title="Poll settings" isOpen={isOpen} onClose={onClose}>
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
                { id: ResultVisibility.Visible, label: 'Visible' },
                { id: ResultVisibility.Hidden, label: 'Hidden' },
              ]}
              activeId={values.resultVisibility}
              onChange={(id) =>
                setValues((prev) => ({
                  ...prev,
                  resultVisibility: id as ResultVisibility,
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
              onChange={(isOn) =>
                setValues((prev) => ({ ...prev, showDescription: isOn }))
              }
            />
          </SettingField>
          {values.showDescription && (
            <StyledInput
              placeholder="Type something here.."
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
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
