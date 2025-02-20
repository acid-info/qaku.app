import React from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { ToggleButton } from '../ToggleButton'
import { FloatingPanel } from './FloatingPanel'
import { SettingField } from './SettingItem'
import { ActionBar, PanelContent, SettingGroup, SettingStack } from './styles'

export type QnaFloatingPanelProps = {
  isOpen: boolean
  onClose: () => void
}

export const QnaFloatingPanel: React.FC<QnaFloatingPanelProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <FloatingPanel title="Q&A settings" isOpen={isOpen} onClose={onClose}>
      <PanelContent>
        <SettingField
          title="Replies"
          description="Allow participants to reply to questions"
          isRow
        >
          <ToggleButton isOn={true} />
        </SettingField>

        <SettingGroup>
          <SettingStack>
            <SettingField
              title="Q&A title"
              description="Edit your Q&A title here"
            >
              <Input placeholder="Type something here.." />
            </SettingField>
          </SettingStack>

          <SettingStack>
            <SettingField
              title="Q&A description"
              description="Add a description"
              isRow
            >
              <ToggleButton isOn={true} />
            </SettingField>
            <Input placeholder="Type something here.." />
          </SettingStack>
        </SettingGroup>

        <ActionBar>
          <Button variant="filledPrimary">Save</Button>
        </ActionBar>
      </PanelContent>
    </FloatingPanel>
  )
}
