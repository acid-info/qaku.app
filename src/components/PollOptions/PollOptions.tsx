import styled from '@emotion/styled'
import React from 'react'
import { PollOptionsItem, PollOptionsItemProps } from '../PollOptionsItem'

export type PollOptionType = Omit<
  PollOptionsItemProps,
  'hasCheckbox' | 'onCheck'
> & {
  id: string
}

export type PollOptionsProps = {
  options: PollOptionType[]
  hasInput?: boolean
  hasCheckbox?: boolean
  selectedOptionIds?: string[]
  onOptionSelect?: (optionId: string) => void
  onRemove?: (optionId: string) => void
}

export const PollOptions: React.FC<PollOptionsProps> = ({
  options,
  selectedOptionIds = [],
  onOptionSelect,
  hasInput = false,
  hasCheckbox = true,
  onRemove,
}) => {
  const handleOptionCheck = (optionId: string) => {
    if (!onOptionSelect) return
    onOptionSelect(optionId)
  }

  return (
    <Container>
      {options.map((option) => (
        <StyledPollOptionsItem
          key={option.id}
          {...option}
          hasCheckbox={hasCheckbox}
          isChecked={selectedOptionIds.includes(option.id)}
          onCheck={() => handleOptionCheck(option.id)}
          hasInput={hasInput}
          onRemove={() => onRemove?.(option.id)}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledPollOptionsItem = styled(PollOptionsItem)`
  &:not(:first-of-type) {
    border-top: none;
  }
`
