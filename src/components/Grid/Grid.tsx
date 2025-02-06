import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type GridProps = {
  columns?: number
  gap?: string
}

const Grid = ({
  columns = 2,
  gap = '8px',
  children,
}: PropsWithChildren & GridProps) => {
  return (
    <GridContainer columns={columns} gap={gap}>
      {children}
    </GridContainer>
  )
}

export default Grid

const GridContainer = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: ${(props) => props.gap};
  width: 100%;

  position: relative;
  margin: 0 auto;
`
