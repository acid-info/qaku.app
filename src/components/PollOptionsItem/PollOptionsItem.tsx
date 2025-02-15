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
} & React.HTMLAttributes<HTMLDivElement>

export const PollOptionsItem: React.FC<PollOptionsItemProps> = ({
  title,
  hasCheckbox,
  isChecked,
  onCheck,
  percentage,
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
        <Title>{title}</Title>
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
`

const Title = styled.h3`
  margin-bottom: 0 !important;
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
