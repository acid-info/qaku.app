import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { IconButtonRound } from '../IconButtonRound'
import { PlusIcon } from '../Icons/PlusIcon'

export const CreateNewQaku: React.FC = () => {
  return (
    <CreateNewQakuWrapper>
      <CreateNewQakuText>Create new Qaku</CreateNewQakuText>
      <Link href="/qna/create">
        <IconButtonRound variant="filledPrimary" icon={<PlusIcon />} />
      </Link>
    </CreateNewQakuWrapper>
  )
}

const CreateNewQakuWrapper = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 24px;
`

const CreateNewQakuText = styled.h1`
  color: var(--white);
  margin: auto 0;
`
