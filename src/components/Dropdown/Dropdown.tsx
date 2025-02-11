import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'

import { DropdownItem } from '../DropdownItem'
import { ChevronDownIcon } from '../Icons/ChevronDownIcon'
import { ChevronUpIcon } from '../Icons/ChevronUpIcon'

export type DropdownOption = {
  label: string
  value: string | number
}

export type DropdownProps = {
  options: DropdownOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  variant?: 'filled' | 'outlined'
  placeholder?: string
}

export const Dropdown = ({
  options,
  value,
  onChange,
  variant = 'filled',
  placeholder = 'Select an option',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string | number) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownItem variant={variant} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : placeholder}
        <IconWrapper>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </IconWrapper>
      </DropdownItem>
      {isOpen && (
        <DropdownList variant={variant}>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              variant={variant}
              active={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  )
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

const DropdownList = styled.div<{ variant: 'filled' | 'outlined' }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 1;

  button {
    border-top: none;
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: var(--white);
`
