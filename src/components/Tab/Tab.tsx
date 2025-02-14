import styled from '@emotion/styled'
import { TabItem } from '../TabItem'

export type TabOption = {
  id: string | number
  label: string
}

export type TabProps = {
  options: TabOption[]
  activeId?: string | number
  variant?: 'primary' | 'secondary'
  itemWidth?: string
  onChange?: (id: string | number) => void
}

export const Tab = ({
  options,
  activeId,
  variant = 'primary',
  itemWidth,
  onChange,
}: TabProps) => {
  return (
    <TabContainer>
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
  display: flex;
`

const TabItemWrapper = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
`
