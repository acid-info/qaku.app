import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import { IconButtonRound } from '../IconButtonRound'
import { CloseIcon } from '../Icons/CloseIcon'

export type FloatingPanelProps = {
  title: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <Container>
      <Panel>
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

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  padding: 14px 14px 14px 0;
`

const Panel = styled.div`
  width: 346px;
  height: 100%;
  background-color: var(--black);
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
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
