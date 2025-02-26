import styled from '@emotion/styled'

export type TileItemProps = {
  label: string
  data: number | string
  size?: 'medium' | 'large'
  isActive?: boolean
  onClick?: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const TileItem = ({
  label,
  data,
  size = 'medium',
  isActive = false,
  onClick,
  ...props
}: TileItemProps) => {
  return (
    <StyledTileItem
      $size={size}
      $isActive={isActive}
      onClick={onClick}
      {...props}
    >
      <div className="tile-item__data">{data}</div>
      <div className="tile-item__label">{label}</div>
    </StyledTileItem>
  )
}

const StyledTileItem = styled.div<{
  $size: TileItemProps['size']
  $isActive: TileItemProps['isActive']
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  padding: 8px 16px;
  background: ${({ $isActive }) =>
    $isActive ? 'var(--gray-darker)' : 'var(--black)'};
  border: 1px solid var(--gray);
  width: ${({ $size }) => ($size === 'medium' ? '116px' : '174px')};
  color: var(--white);
  cursor: pointer;

  &:hover {
    background: var(--gray-ultradark);
  }

  &:active {
    background: var(--black);
  }

  .tile-item__label {
    font-size: var(--body1-font-size);
    line-height: var(--body1-line-height);
  }

  .tile-item__data {
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
    margin-left: auto;
    opacity: 0.5;
  }
`
