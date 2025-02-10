import styled from '@emotion/styled'
import React from 'react'

const CreateNewQakuWrapper = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  gap: 24px;
`

const CreateNewQakuText = styled.h1`
  color: var(--white);
  margin: auto 0;
`

const IconButton = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: var(--yellow);
  display: flex;
  min-height: 32px;
  gap: 8px;
  width: 32px;
  height: 32px;
  margin: auto 0;
  padding: 0 4px;
  border: none;
  cursor: pointer;
`

const IconImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  flex: 1;
`

export const CreateNewQaku: React.FC = () => {
  return (
    <CreateNewQakuWrapper>
      <CreateNewQakuText>Create new Qaku</CreateNewQakuText>
      <IconButton aria-label="Create new Qaku">+</IconButton>
    </CreateNewQakuWrapper>
  )
}
