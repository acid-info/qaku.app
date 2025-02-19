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

export const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
`
