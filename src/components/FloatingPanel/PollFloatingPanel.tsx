import React from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Tab } from '../Tab'
import { ToggleButton } from '../ToggleButton'
import { FloatingPanel } from './FloatingPanel'
import { SettingField } from './SettingItem'
import { ActionBar, PanelContent, SettingGroup, SettingStack } from './styles'

export type PollFloatingPanelProps = {
  isOpen: boolean
  onClose: () => void
}

export const PollFloatingPanel: React.FC<PollFloatingPanelProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <FloatingPanel title="Poll settings" isOpen={isOpen} onClose={onClose}>
      <PanelContent>
        <SettingGroup>
          <SettingField
            title="Multiple options"
            description="Participants can select more than one option"
            isRow
          >
            <ToggleButton isOn={true} />
          </SettingField>

          <SettingField
            title="Mark correct answer"
            description="Select and show the correct answer to participants"
            isRow
          >
            <ToggleButton isOn={true} />
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
                { id: 'visible', label: 'Visible' },
                { id: 'hidden', label: 'Hidden' },
              ]}
            />
          </SettingField>
        </SettingStack>

        <SettingGroup>
          <SettingStack>
            <SettingField title="Poll title" description="Edit your title">
              <Input placeholder="Type something here.." />
            </SettingField>
          </SettingStack>

          <SettingField
            title="Poll description"
            description="Add a description"
            isRow
          >
            <ToggleButton isOn={true} />
          </SettingField>
        </SettingGroup>

        <ActionBar>
          <Button variant="filledPrimary">Save</Button>
        </ActionBar>
      </PanelContent>
    </FloatingPanel>
  )
}
