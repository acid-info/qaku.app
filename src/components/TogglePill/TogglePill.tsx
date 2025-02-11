import styled from '@emotion/styled'
import { FC, ReactNode } from 'react'

import { ThumbFilledIcon } from '../Icons/ThumbFilledIcon'
import { ThumbIcon } from '../Icons/ThumbIcon'

export interface TogglePillProps {
  count: number
  isActive?: boolean
  icon?: ReactNode
  activeIcon?: ReactNode
  onClick?: () => void
}

export const TogglePill: FC<TogglePillProps> = ({
  count,
  isActive = false,
  icon = <ThumbIcon style={{ width: 14, height: 14 }} />,
  activeIcon = <ThumbFilledIcon style={{ width: 14, height: 14 }} />,
  onClick,
}) => {
  return (
    <PillContainer onClick={onClick} $isActive={isActive}>
      <IconWrapper>{isActive ? activeIcon : icon}</IconWrapper>
      <Count>{count}</Count>
    </PillContainer>
  )
}

const PillContainer = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  border: 1px solid var(--gray);
  background: ${({ $isActive }) =>
    $isActive ? 'var(--gray-darkest)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--gray);
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
`

const Count = styled.span`
  color: var(--white);
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
`
