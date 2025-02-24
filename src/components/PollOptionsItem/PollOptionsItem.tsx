import styled from '@emotion/styled'
import React from 'react'
import { getValidPercentage } from '../../utils/general.utils'
import { IconButtonRound } from '../IconButtonRound'
import { CheckIcon } from '../Icons/CheckIcon'

export type PollOptionsItemProps = {
  title: string
  hasCheckbox: boolean
  isChecked: boolean
  onCheck: (isChecked: boolean) => void
  percentage: number
  isInput?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const PollOptionsItem: React.FC<PollOptionsItemProps> = ({
  title,
  hasCheckbox,
  isChecked,
  onCheck,
  percentage,
  isInput = false,
  ...props
}) => {
  const validPercentage = getValidPercentage(percentage)

  return (
    <Container {...props}>
      <Top>
        {hasCheckbox && (
          <IconButtonRound
            variant={isChecked ? 'filledPrimary' : 'outlined'}
            icon={
              <CheckIcon
                style={{ color: isChecked ? 'var(--black)' : 'var(--white)' }}
              />
            }
            onClick={() => onCheck(!isChecked)}
          />
        )}
        {isInput ? (
          <StyledInput
            defaultValue={title}
            placeholder="Type something here.."
          />
        ) : (
          <Title>{title}</Title>
        )}
      </Top>
      <Bottom>
        <ProgressBar>
          <Progress style={{ width: `${validPercentage}%` }} />
        </ProgressBar>
        <PercentageText>{validPercentage}%</PercentageText>
      </Bottom>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: transparent;
  border: 1px solid var(--gray);
`

const Top = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
`

const Title = styled.h3`
  margin-bottom: 0 !important;
  flex: 1;
`

const Bottom = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--gray-darker);
  position: relative;
`

const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: var(--white);
  transition: width 0.3s ease-in-out;
`

const PercentageText = styled.span`
  color: var(--white);
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
  min-width: 45px;
  opacity: 0.5;
`

const StyledInput = styled.input`
  background: transparent;
  border: none;
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
  flex: 1;
  min-width: 0;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--gray);
  }
`
