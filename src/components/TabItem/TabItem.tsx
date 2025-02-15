import styled from '@emotion/styled'

export type VariantType = 'primary' | 'secondary' | 'tertiary'

type VariantConfig = {
  activeBackground: string
  inactiveBackground: string
  hoverBackground: string
  textColor: {
    active: string
    inactive: string
  }
  opacity: {
    active: number
    inactive: number
  }
  hasBorder: boolean
}

const VARIANT_CONFIG: Record<VariantType, VariantConfig> = {
  primary: {
    activeBackground: 'var(--yellow)',
    inactiveBackground: 'var(--black)',
    hoverBackground: 'var(--gray-darkest)',
    textColor: {
      active: 'var(--black)',
      inactive: 'var(--white)',
    },
    opacity: {
      active: 1,
      inactive: 0.7,
    },
    hasBorder: false,
  },
  secondary: {
    activeBackground: 'var(--gray)',
    inactiveBackground: 'transparent',
    hoverBackground: 'var(--gray-darker)',
    textColor: {
      active: 'var(--white)',
      inactive: 'var(--white)',
    },
    opacity: {
      active: 1,
      inactive: 1,
    },
    hasBorder: true,
  },
  tertiary: {
    activeBackground: 'var(--gray-light)',
    inactiveBackground: 'transparent',
    hoverBackground: 'var(--gray-light)',
    textColor: {
      active: 'var(--white)',
      inactive: 'var(--white)',
    },
    opacity: {
      active: 1,
      inactive: 1,
    },
    hasBorder: true,
  },
}

export type TabItemProps = {
  label: string
  isActive?: boolean
  variant?: VariantType
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

const getBackgroundColor = (variant: VariantType, isActive: boolean) => {
  const config = VARIANT_CONFIG[variant]
  return isActive ? config.activeBackground : config.inactiveBackground
}

const getTextColor = (variant: VariantType, isActive: boolean) => {
  const config = VARIANT_CONFIG[variant]
  return isActive ? config.textColor.active : config.textColor.inactive
}

const getHoverBackground = (variant: VariantType, isActive: boolean) => {
  if (isActive) return undefined
  return VARIANT_CONFIG[variant].hoverBackground
}

const getOpacity = (variant: VariantType, isActive: boolean) => {
  const config = VARIANT_CONFIG[variant]
  return isActive ? config.opacity.active : config.opacity.inactive
}

const StyledTabItem = styled.button<{
  $isActive: boolean
  $variant: VariantType
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);

  padding: ${({ $variant }) =>
    VARIANT_CONFIG[$variant].hasBorder ? '7px 32px' : '8px 32px'};
  border-radius: 40px;
  border: ${({ $variant }) =>
    VARIANT_CONFIG[$variant].hasBorder ? '1px solid var(--gray)' : 'none'};
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
