import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import { breakpoints } from '../../configs/ui.configs'
import { IconButtonRound } from '../IconButtonRound'
import { CloseIcon } from '../Icons/CloseIcon'

export type FloatingPanelProps = {
  title: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  title,
  children,
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <Container $isOpen={isOpen} {...props}>
      <Panel $isOpen={isOpen}>
        <Header>
          <h2>{title}</h2>
          <IconButtonRound
            icon={<CloseIcon />}
            onClick={onClose}
            size="medium"
          />
        </Header>
        <Content>{children}</Content>
      </Panel>
    </Container>
  )
}

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: flex-end;
  padding: 14px 14px 14px 0;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.2s ease;

  &.is-above-all {
    z-index: 6;
  }

  @media (max-width: ${breakpoints.sm}px) {
    background-color: color-mix(in srgb, var(--black) 50%, transparent);
    padding: 16px;
    justify-content: center;
  }
`

const Panel = styled.div<{ $isOpen: boolean }>`
  width: 346px;
  height: 100%;
  background-color: var(--black);
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0 !important;
  }
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`
