import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'
import React, { HTMLAttributes } from 'react'

export type QnaCreatedHeaderProps = HTMLAttributes<HTMLDivElement> & {
  questionsCount: number
  anonymousRate: number
  namedAuthorCount: number
}

export const QnaCreatedHeader: React.FC<QnaCreatedHeaderProps> = ({
  questionsCount,
  anonymousRate,
  namedAuthorCount,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Content>
        <DataItem>
          <DataItemLabel>Total Questions</DataItemLabel>
          <DataItemValue>{questionsCount}</DataItemValue>
        </DataItem>
        <DataItem>
          <DataItemLabel>Anonymous Rate</DataItemLabel>
          <DataItemValue>{anonymousRate}%</DataItemValue>
        </DataItem>
        <DataItem>
          <DataItemLabel>Named authors</DataItemLabel>
          <DataItemValue>{namedAuthorCount}</DataItemValue>
        </DataItem>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;

  @media (max-width: ${breakpoints.sm}px) {
    overflow-x: auto;
    min-height: 73px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  @media (max-width: ${breakpoints.sm}px) {
    display: inline-flex;
    min-width: 532px;
  }
`

const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const DataItemLabel = styled.div`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  color: var(--white);
  opacity: 0.7;
  padding: 8px 0;
  border-bottom: 1px solid var(--gray);
  width: 100%;
`

const DataItemValue = styled.div`
  font-size: var(--body1-font-size);
  line-height: var(--body1-line-height);
  color: var(--white);
  padding: 8px 0;
  width: 100%;
`
