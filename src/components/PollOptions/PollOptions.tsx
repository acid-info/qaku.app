import styled from '@emotion/styled'
import React from 'react'
import { PollOptionsItem, PollOptionsItemProps } from '../PollOptionsItem'

export type PollOption = Omit<
  PollOptionsItemProps,
  'hasCheckbox' | 'onCheck'
> & {
  id: string
}

export type PollOptionsProps = {
  options: PollOption[]
  selectedOptionId?: string
  onOptionSelect?: (optionId: string) => void
}

export const PollOptions: React.FC<PollOptionsProps> = ({
  options,
  selectedOptionId,
  onOptionSelect,
}) => {
  return (
    <Container>
      {options.map((option) => (
        <StyledPollOptionsItem
          key={option.id}
          {...option}
          hasCheckbox={true}
          isChecked={option.id === selectedOptionId}
          onCheck={() => onOptionSelect?.(option.id)}
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
