import styled from '@emotion/styled'
import React from 'react'

export interface TimeInputProps {
  hours: number
  minutes: number
  onChange: (hours: number, minutes: number) => void
}

export const TimeInput: React.FC<TimeInputProps> = ({
  hours,
  minutes,
  onChange,
}) => {
  const handleHoursChange = (value: string) => {
    const newHours = Math.max(0, Math.min(23, parseInt(value) || 0))
    onChange(newHours, minutes)
  }

  const handleMinutesChange = (value: string) => {
    const newMinutes = Math.max(0, Math.min(59, parseInt(value) || 0))
    onChange(hours, newMinutes)
  }

  return (
    <TimeSection>
      <TimeLabel>Time</TimeLabel>
      <TimeInputs>
        <TimeInputContainer>
          <StyledTimeInput
            type="number"
            min="0"
            max="23"
            value={hours.toString().padStart(2, '0')}
            onChange={(e) => handleHoursChange(e.target.value)}
          />
        </TimeInputContainer>
        <TimeSeparator>:</TimeSeparator>
        <TimeInputContainer>
          <StyledTimeInput
            type="number"
            min="0"
            max="59"
            value={minutes.toString().padStart(2, '0')}
            onChange={(e) => handleMinutesChange(e.target.value)}
          />
        </TimeInputContainer>
      </TimeInputs>
      <TimeInputLabelsContainer>
        <TimeInputLabel>
          <span>hour</span>
        </TimeInputLabel>
        <TimeInputLabel>
          <span>minute</span>
        </TimeInputLabel>
      </TimeInputLabelsContainer>
    </TimeSection>
  )
}

const TimeSection = styled.div`
  margin-top: 24px;
  width: 100%;
`

const TimeLabel = styled.div`
  color: var(--white);
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
  margin-bottom: 8px;
`

const TimeInputs = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
`

const TimeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledTimeInput = styled.input`
  width: 100%;
  padding: 11px;
  border: 1px solid var(--gray-light);
  background-color: transparent;
  color: var(--white);
  font-size: var(--body1-font-size);
  line-height: var(--body1-line-height);
  text-align: center;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus,
  &:hover {
    border-color: var(--gray-lighter);
  }
`

const TimeSeparator = styled.div`
  color: #a8a8a8;
  font-size: var(--body1-font-size);
  line-height: var(--body1-line-height);
`

const TimeInputLabelsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px;
  gap: 21px;
`

const TimeInputLabel = styled.div`
  width: 100%;
  color: var(--white);
  opacity: 0.7;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);

  span {
    margin-left: 11px;
  }
`
