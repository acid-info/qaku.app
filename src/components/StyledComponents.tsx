import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'

export const LayoutContainer = styled.div`
  width: calc(100% - var(--sidebar-width));
  height: 100%;
  position: relative;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

export const Row = styled.div<{ gap?: number }>`
  display: flex;
  gap: ${({ gap }) => gap || 2}px;
  align-items: center;
`
