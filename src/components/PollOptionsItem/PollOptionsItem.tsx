import { getValidPercentage } from '@/utils/general.utils'
import styled from '@emotion/styled'
import React from 'react'
import { IconButtonRound } from '../IconButtonRound'
import { CheckIcon } from '../Icons/CheckIcon'
import { CloseIcon } from '../Icons/CloseIcon'

export type PollOptionsItemProps = {
  title: string
  hasCheckbox: boolean
  isChecked: boolean
  percentage: number
  hasInput?: boolean
  onCheck: (isChecked: boolean) => void
  onRemove?: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const PollOptionsItem: React.FC<PollOptionsItemProps> = ({
  title,
  hasCheckbox,
  isChecked,
  percentage,
  hasInput = false,
  onCheck,
  onRemove,
  ...props
}) => {
  const validPercentage = getValidPercentage(percentage)

  return (
    <Container {...props}>
      <Top>
        <MainContent>
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
          {hasInput ? (
            <StyledInput defaultValue={title} />
          ) : (
            <Title>{title}</Title>
          )}
        </MainContent>
        {hasInput && (
          <HoverIconButtonRound
            className="hover-icon-button"
            icon={<StyledCloseIcon />}
            onClick={onRemove}
          />
        )}
      </Top>
      <Bottom>
        <ProgressBar>
          <Progress style={{ width: `${validPercentage}%` }} />
        </ProgressBar>
        <PercentageContainer>{validPercentage}%</PercentageContainer>
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

  &:hover {
    .hover-icon-button {
      opacity: 1;
    }
  }
`

const Top = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
`

const MainContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
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

const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
  width: 36px;
  opacity: 0.5;
`

const StyledInput = styled.input`
  background: transparent;
  border: none;
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
  flex: 1;
  min-width: 0;

  &::placeholder {
    opacity: 0.5;
  }

  &:hover:not(:focus) {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    opacity: 1;
  }
`

const HoverIconButtonRound = styled(IconButtonRound)`
  background-color: var(--gray-darker);
  border-color: var(--gray-darker);
  opacity: 0;
`

const StyledCloseIcon = styled(CloseIcon)`
  opacity: 0.7;
`
