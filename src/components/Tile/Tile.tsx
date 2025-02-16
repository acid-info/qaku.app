import styled from '@emotion/styled'
import { TileItem, TileItemProps } from '../TileItem'

export type TileProps = {
  items: TileItemProps[]
  gap?: number
  orientation?: 'horizontal' | 'vertical'
} & React.HTMLAttributes<HTMLDivElement>

export const Tile = ({
  items,
  gap = 0,
  orientation = 'horizontal',
  ...props
}: TileProps) => {
  return (
    <StyledTileContainer $gap={gap} $orientation={orientation} {...props}>
      {items.map((item, index) => (
        <TileItem key={index} {...item} />
      ))}
    </StyledTileContainer>
  )
}

const StyledTileContainer = styled.div<{
  $gap: TileProps['gap']
  $orientation: TileProps['orientation']
}>`
  display: flex;
  gap: ${({ $gap }) => `${$gap}px`};
  flex-direction: ${({ $orientation }) =>
    $orientation === 'horizontal' ? 'row' : 'column'};

  & > div:not(:last-child) {
    border-right: none;
  }
`
