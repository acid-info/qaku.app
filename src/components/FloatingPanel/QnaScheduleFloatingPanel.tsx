import { BaseFloatingPanelPropsInterface } from '@/types/settings.types'
import React, { useState } from 'react'
import { Button } from '../Button'
import { DateInput } from '../DateInput/DateInput'
import { FloatingPanel } from './FloatingPanel'
import { SettingField } from './SettingItem'
import { ActionBar, PanelContent, SettingStack } from './styledComponents'

export interface QnaScheduleFloatingPanelProps
  extends BaseFloatingPanelPropsInterface {
  onSchedule: (startDate: Date, endDate: Date) => void
}

export const QnaScheduleFloatingPanel: React.FC<
  QnaScheduleFloatingPanelProps
> = ({ isOpen, onClose, onSchedule }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const handleSchedule = () => {
    if (startDate && endDate) {
      onSchedule(startDate, endDate)
      onClose()
    }
  }

  return (
    <FloatingPanel title="Schedule Q&A" isOpen={isOpen} onClose={onClose}>
      <PanelContent>
        <SettingStack>
          <SettingField
            title="Start Date"
            description="When the Q&A will start"
          >
            <DateInput
              value={startDate}
              onChange={setStartDate}
              placeholder="Select start date.."
            />
          </SettingField>
        </SettingStack>

        <SettingStack>
          <SettingField title="End Date" description="When the Q&A will end">
            <DateInput
              value={endDate}
              onChange={setEndDate}
              placeholder="Select end date.."
            />
          </SettingField>
        </SettingStack>

        <ActionBar>
          <Button variant="filledPrimary" onClick={handleSchedule}>
            Schedule Q&A
          </Button>
        </ActionBar>
      </PanelContent>
    </FloatingPanel>
  )
}
