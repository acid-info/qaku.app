import { useOnClickOutside } from '@/../hooks/useOnClickOutside'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { IconButtonRound } from '../IconButtonRound'
import { CalendarIcon } from '../Icons/CalendarIcon'
import { ChevronLeftIcon } from '../Icons/ChevronLeftIcon'
import { ChevronRightIcon } from '../Icons/ChevronRightIcon'
import { TimeInput } from './TimeInput'

export interface DateInputProps {
  value?: Date
  onChange?: (date: Date) => void
  placeholder?: string
  disabled?: boolean
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const createDateWithTime = (date: Date, hours: number, minutes: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)

const formatDate = (date?: Date): string => {
  if (!date) return ''

  const dateStr = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
  return `${dateStr}, ${timeStr}`
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = 'Select a date..',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)
  const [currentMonth, setCurrentMonth] = useState(() => value || new Date())
  const [pendingDate, setPendingDate] = useState<Date | undefined>(value)
  const [pendingHours, setPendingHours] = useState(() => value?.getHours() ?? 0)
  const [pendingMinutes, setPendingMinutes] = useState(
    () => value?.getMinutes() ?? 0,
  )

  const calendarRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(calendarRef, () => setIsOpen(false), isOpen)

  const handleDateSelect = (date: Date) => {
    const newDate = createDateWithTime(date, pendingHours, pendingMinutes)
    setPendingDate(newDate)
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  const handleTimeChange = (newHours: number, newMinutes: number) => {
    setPendingHours(newHours)
    setPendingMinutes(newMinutes)

    if (!pendingDate) return

    const newDate = createDateWithTime(pendingDate, newHours, newMinutes)
    setPendingDate(newDate)
  }

  const applyChanges = useCallback(
    (date?: Date) => {
      setSelectedDate(date)
      if (onChange) onChange(date as any)
    },
    [onChange],
  )

  const handleConfirm = useCallback(() => {
    if (!pendingDate) {
      applyChanges(undefined)
      setIsOpen(false)
      return
    }

    const confirmedDate = createDateWithTime(
      pendingDate,
      pendingHours,
      pendingMinutes,
    )
    applyChanges(confirmedDate)
    setIsOpen(false)
  }, [pendingDate, pendingHours, pendingMinutes, applyChanges])

  const resetPendingState = useCallback(() => {
    setPendingDate(selectedDate)
    setPendingHours(selectedDate?.getHours() ?? 0)
    setPendingMinutes(selectedDate?.getMinutes() ?? 0)
  }, [selectedDate])

  const handleCancel = useCallback(() => {
    resetPendingState()
    setIsOpen(false)
  }, [resetPendingState])

  const navigateMonth = (direction: 'prev' | 'next') => {
    const monthOffset = direction === 'prev' ? -1 : 1
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + monthOffset,
        1,
      ),
    )
  }

  const toggleCalendar = () => {
    if (disabled) return
    setIsOpen(!isOpen)
  }

  const renderCalendarHeader = () => {
    const monthYear = currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })

    return (
      <CalendarHeader>
        <MonthYearDisplay>{monthYear}</MonthYearDisplay>
        <NavButtons>
          <IconButtonRound
            icon={<ChevronLeftIcon />}
            onClick={() => navigateMonth('prev')}
          />
          <IconButtonRound
            icon={<ChevronRightIcon />}
            onClick={() => navigateMonth('next')}
          />
        </NavButtons>
      </CalendarHeader>
    )
  }

  const renderDaysOfWeek = () => (
    <DaysOfWeek>
      {DAYS_OF_WEEK.map((day) => (
        <DayOfWeek key={day}>{day}</DayOfWeek>
      ))}
    </DaysOfWeek>
  )

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDayOfWeek = firstDay.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const totalCells = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7

    return (
      <CalendarDays>
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayOffset = i - startDayOfWeek
          const date = new Date(year, month, dayOffset + 1)
          const isCurrentMonth = date.getMonth() === month
          const isSelected = pendingDate?.toDateString() === date.toDateString()

          return (
            <DayCell
              key={
                isCurrentMonth
                  ? date.getDate()
                  : `${date.getMonth()}-${date.getDate()}`
              }
              onClick={() => handleDateSelect(date)}
              selected={isSelected}
              otherMonth={!isCurrentMonth}
            >
              {date.getDate()}
            </DayCell>
          )
        })}
      </CalendarDays>
    )
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return
      if (event.key !== 'Escape' && event.key !== 'Enter') return

      if (event.key === 'Enter') {
        handleConfirm()
        return
      }

      handleCancel()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleConfirm, handleCancel])

  useEffect(() => {
    if (!isOpen) return

    resetPendingState()
    setCurrentMonth(selectedDate || new Date())
  }, [isOpen, selectedDate, resetPendingState])

  return (
    <DateInputWrapper>
      <StyledInput
        value={formatDate(selectedDate)}
        readOnly
        placeholder={placeholder}
        onClick={toggleCalendar}
        disabled={disabled}
        $isOpen={isOpen}
      />
      <CalendarIconContainer $disabled={disabled} onClick={toggleCalendar}>
        <CalendarIcon color="var(--white)" />
      </CalendarIconContainer>
      {isOpen && (
        <CalendarContainer ref={calendarRef}>
          {renderCalendarHeader()}
          {renderDaysOfWeek()}
          {renderCalendarDays()}
          <TimeInput
            hours={pendingHours}
            minutes={pendingMinutes}
            onChange={handleTimeChange}
          />
          <ButtonContainer>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleConfirm}>
              Confirm
            </Button>
          </ButtonContainer>
        </CalendarContainer>
      )}
    </DateInputWrapper>
  )
}

const DateInputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input<{ $isOpen?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 16px;
  border: 1px solid var(--gray);
  background-color: ${({ $isOpen }) =>
    $isOpen ? 'var(--gray-darker)' : 'transparent'};
  color: var(--white);
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    opacity: 0.7;
  }
`

const CalendarIconContainer = styled.div<{ $disabled: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 16px;
  height: 16px;

  ${({ $disabled }) => $disabled && `opacity: 0.5; cursor: not-allowed;`}
`

const CalendarContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 16px;
  border: 1px solid var(--gray);
  border-top: none;
  background-color: var(--gray-darker);
  z-index: 1;
`

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const MonthYearDisplay = styled.div`
  color: var(--white);
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
`

const NavButtons = styled.div`
  display: flex;
`

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const DayOfWeek = styled.div`
  opacity: 0.7;
  text-align: center;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  color: var(--white);
`

const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const DayCell = styled.div<{
  selected?: boolean
  otherMonth?: boolean
}>`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  border: 1px solid var(--gray-light);
  margin: -1px 0 0 -1px;
  cursor: pointer;
  color: ${({ selected, otherMonth }) => {
    if (selected) return 'var(--black)'
    if (otherMonth) return 'color-mix(in srgb, var(--white) 50%, transparent)'
    return 'var(--white)'
  }};
  background-color: ${({ selected, otherMonth }) => {
    if (selected) return 'var(--yellow)'
    if (otherMonth) return 'var(--gray-dark)'
    return 'transparent'
  }};

  &:hover {
    background-color: ${({ selected, otherMonth }) => {
      if (selected) return ''
      if (otherMonth) return 'var(--gray-dark)'
      return 'var(--gray)'
    }};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;

  button {
    padding: 8px 16px;
  }
`
