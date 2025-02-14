import styled from '@emotion/styled'

export type TabItemProps = {
  label: string
  isActive?: boolean
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export const TabItem = ({
  label,
  isActive = false,
  variant = 'primary',
  onClick,
}: TabItemProps) => {
  return (
    <StyledTabItem
      onClick={isActive ? undefined : onClick}
      $isActive={isActive}
      $variant={variant}
    >
      {label}
    </StyledTabItem>
  )
}

const getBackgroundColor = (
  variant: 'primary' | 'secondary',
  isActive: boolean,
) => {
  switch (variant) {
    case 'primary':
      return isActive ? 'var(--yellow)' : 'var(--black)'
    case 'secondary':
      return isActive ? 'var(--gray)' : 'transparent'
  }
}

const getTextColor = (variant: 'primary' | 'secondary', isActive: boolean) => {
  switch (variant) {
    case 'primary':
      return isActive ? 'var(--black)' : 'var(--white)'
    case 'secondary':
      return 'var(--white)'
  }
}

const getHoverBackground = (
  variant: 'primary' | 'secondary',
  isActive: boolean,
) => {
  if (isActive) return undefined

  switch (variant) {
    case 'primary':
      return 'var(--gray-darkest)'
    case 'secondary':
      return 'var(--gray-darker)'
  }
}

const getOpacity = (variant: 'primary' | 'secondary', isActive: boolean) => {
  switch (variant) {
    case 'primary':
      return isActive ? 1 : 0.7
    case 'secondary':
      return 1
  }
}

const StyledTabItem = styled.button<{
  $isActive: boolean
  $variant: 'primary' | 'secondary'
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 32px;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);

  border-radius: 40px;
  border: ${({ $variant }) =>
    $variant === 'secondary' ? '1px solid var(--gray)' : 'none'};
  transition: background-color 0.2s ease;
  cursor: ${({ $isActive }) => ($isActive ? 'default' : 'pointer')};
  background-color: ${({ $variant, $isActive }) =>
    getBackgroundColor($variant, $isActive)};
  color: ${({ $variant, $isActive }) => getTextColor($variant, $isActive)};
  opacity: ${({ $variant, $isActive }) => getOpacity($variant, $isActive)};

  &:hover {
    background-color: ${({ $variant, $isActive }) =>
      getHoverBackground($variant, $isActive)};
  }
`
