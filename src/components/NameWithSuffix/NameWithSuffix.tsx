import styled from '@emotion/styled'
import React from 'react'
import { VerifiedIcon } from '../Icons/VerifiedIcon'

interface NameWithSuffixProps {
  name: string
  suffixDelimiter?: string
  icon?: React.ReactNode
}

const parseSuffix = (fullName: string, suffixDelimiter: string) => {
  const idx = fullName.toLowerCase().lastIndexOf(suffixDelimiter)
  if (idx !== -1) {
    return { main: fullName.slice(0, idx), parsedSuffix: fullName.slice(idx) }
  }
  return { main: fullName, parsedSuffix: '' }
}

export function NameWithSuffix({
  name,
  suffixDelimiter = '.',
  icon = <VerifiedIcon />,
}: NameWithSuffixProps) {
  const { main, parsedSuffix } = parseSuffix(name, suffixDelimiter)

  return (
    <Container>
      <span>
        {main}
        {parsedSuffix && <Suffix>{parsedSuffix}</Suffix>}
      </span>
      {parsedSuffix && icon}
    </Container>
  )
}

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;

  span {
    font-size: var(--label1-font-size);
    line-height: var(--label1-line-height);
    color: var(--white);
  }
`

const Suffix = styled.span`
  opacity: 0.5;
`
