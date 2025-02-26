import styled from '@emotion/styled'
import React from 'react'

import { PlusIcon } from '../Icons/PlusIcon'

export type QnAWidgetItemVariantType = 'text' | 'icon'

export interface QnAWidgetItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  isActive?: boolean
  variant?: QnAWidgetItemVariantType
}

export const QnAWidgetItem: React.FC<QnAWidgetItemProps> = ({
  title = '',
  isActive = false,
  variant = 'text',
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $isActive={isActive} {...props}>
      {variant === 'text' && <span>{title}</span>}
      {variant === 'icon' && (
        <IconWrapper>
          <PlusIcon />
        </IconWrapper>
      )}
    </StyledButton>
  )
}

const StyledButton = styled.button<{
  $variant: QnAWidgetItemVariantType
  $isActive: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ $variant }) =>
    $variant === 'icon' ? 'center' : 'flex-start'};
  width: 100%;
  padding: 15px;
  border: 1px solid var(--gray);
  border-radius: 999px;
  cursor: pointer;
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--gray-light)' : 'transparent'};

  span {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }

  &:hover {
    background-color: var(--gray-light);
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;

  svg {
    color: var(--white);
  }
`
