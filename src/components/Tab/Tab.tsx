import styled from '@emotion/styled'
import { TabItem, VariantType } from '../TabItem'

export type TabOptionType = {
  id: string | number
  label: string
}

export type TabProps = {
  options: TabOptionType[]
  activeId?: string | number
  variant?: VariantType
  itemWidth?: string
  onChange?: (id: string | number) => void
}

export const Tab = ({
  options,
  activeId,
  variant = 'primary',
  itemWidth,
  onChange,
  ...props
}: TabProps) => {
  return (
    <TabContainer {...props}>
      {options.map((option) => (
        <TabItemWrapper key={option.id} $width={itemWidth}>
          <TabItem
            label={option.label}
            isActive={option.id === activeId}
            variant={variant}
            onClick={() => onChange?.(option.id)}
          />
        </TabItemWrapper>
      ))}
    </TabContainer>
  )
}

const TabContainer = styled.div`
  display: inline-flex;
`

const TabItemWrapper = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
`
