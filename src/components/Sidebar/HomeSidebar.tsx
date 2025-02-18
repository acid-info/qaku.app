import styled from '@emotion/styled'
import React from 'react'
import { Tile } from '../Tile'

export const HomeSidebar: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <Title>Your Q&As</Title>
      </div>
      <div style={{ display: 'flex' }}>
        <Tile
          items={[
            {
              label: 'Questions4',
              data: 42,
              size: 'large',
              onClick: () => console.log('Clicked'),
            },
            {
              label: 'Questions5',
              data: 12,
              size: 'large',
            },
          ]}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  width: 100%;
`

const Title = styled.h2`
  color: var(--white);
  margin: auto 0;
`
