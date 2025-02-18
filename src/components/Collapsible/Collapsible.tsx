import styled from '@emotion/styled'
import React, { useState } from 'react'

import { IconButtonRound } from '../IconButtonRound'
import { PlusIcon } from '../Icons/PlusIcon'
import { RemoveIcon } from '../Icons/RemoveIcon'

export type CollapsibleProps = {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Container>
      <Header onClick={toggleExpanded} role="button" tabIndex={0}>
        <Title>{title}</Title>
        <IconButtonRound
          icon={isExpanded ? <RemoveIcon /> : <PlusIcon />}
          onClick={(e) => {
            e.stopPropagation()
            toggleExpanded()
          }}
          size="small"
          variant="filledPrimary"
        />
      </Header>
      {isExpanded && <>{children}</>}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`

const Title = styled.span`
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
`
