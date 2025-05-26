import { useOnClickOutside } from '@/../hooks/useOnClickOutside'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
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

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = 'Select a date..',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)
  const [currentMonth, setCurrentMonth] = useState(() => value || new Date())
  const [hours, setHours] = useState(() => value?.getHours() ?? 0)
  const [minutes, setMinutes] = useState(() => value?.getMinutes() ?? 0)
  const calendarRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(calendarRef, () => setIsOpen(false), isOpen)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && (event.key === 'Escape' || event.key === 'Enter')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    )
    setSelectedDate(newDate)
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    if (onChange) {
      onChange(newDate)
    }
  }

  const handleTimeChange = (newHours: number, newMinutes: number) => {
    setHours(newHours)
    setMinutes(newMinutes)
    if (selectedDate) {
      const newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        newHours,
        newMinutes,
      )
      setSelectedDate(newDate)
      if (onChange) {
        onChange(newDate)
      }
    }
  }

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

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    )
  }

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    )
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
          <IconButtonRound icon={<ChevronLeftIcon />} onClick={prevMonth} />
          <IconButtonRound icon={<ChevronRightIcon />} onClick={nextMonth} />
        </NavButtons>
      </CalendarHeader>
    )
  }

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return (
      <DaysOfWeek>
        {daysOfWeek.map((day) => (
          <DayOfWeek key={day}>{day}</DayOfWeek>
        ))}
      </DaysOfWeek>
    )
  }

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const startDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    // Calculate total grid size
    const totalCells = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7

    return (
      <CalendarDays>
        {Array.from({ length: totalCells }).map((_, i) => {
          // Calculate date for this cell
          const dayOffset = i - startDayOfWeek
          const date = new Date(year, month, dayOffset + 1)

          const isCurrentMonth = date.getMonth() === month
          const isSelected =
            selectedDate?.toDateString() === date.toDateString()

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

  return (
    <DateInputWrapper>
      <StyledInput
        value={formatDate(selectedDate)}
        readOnly
        placeholder={placeholder}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        $isOpen={isOpen}
      />
      <CalendarIconContainer
        $disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <CalendarIcon color="var(--white)" />
      </CalendarIconContainer>
      {isOpen && (
        <CalendarContainer ref={calendarRef}>
          {renderCalendarHeader()}
          {renderDaysOfWeek()}
          {renderCalendarDays()}
          <TimeInput
            hours={hours}
            minutes={minutes}
            onChange={handleTimeChange}
          />
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

  ${({ $disabled }) => $disabled && `opacity: 0.5;`}
  ${({ $disabled }) => $disabled && `cursor: not-allowed;`}
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
