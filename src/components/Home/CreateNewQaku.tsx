import { QnA } from '@/data/routes'
import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { IconButtonRound } from '../IconButtonRound'
import { PlusIcon } from '../Icons/PlusIcon'

export const CreateNewQaku: React.FC = () => {
  return (
    <CreateNewQakuWrapper>
      <Link href={QnA.CREATE}>
        <CreateNewQakuText>Create new Qaku</CreateNewQakuText>
        <IconButtonRound
          variant="filledPrimary"
          icon={<PlusIcon style={{ width: '24px', height: '24px' }} />}
        />
      </Link>
    </CreateNewQakuWrapper>
  )
}

const CreateNewQakuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  a {
    display: flex;
    align-items: center;
    gap: 24px;
  }
`

const CreateNewQakuText = styled.h1`
  color: var(--white);
`
