import styled from '@emotion/styled'
import React, { useState } from 'react'
import { ToggleButton } from '../ToggleButton'

export type CollapsibleToggleProps = {
  title: string
  description?: string
  children: React.ReactNode
  defaultChecked?: boolean
}

export const CollapsibleToggle: React.FC<CollapsibleToggleProps> = ({
  title,
  description,
  children,
  defaultChecked = false,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  return (
    <Container>
      <Header>
        <TextContent>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </TextContent>
        <ToggleButton isOn={isChecked} onChange={setIsChecked} />
      </Header>
      {isChecked && <>{children}</>}
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
  justify-content: space-between;
  gap: 16px;
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.span`
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
  color: var(--white);
`

const Description = styled.span`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  color: var(--white);
  opacity: 0.7;
`
