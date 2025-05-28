import styled from '@emotion/styled'

export interface DateRangePillProps {
  startDate: Date
  endDate: Date
}

const formatDateRange = (startDate: Date, endDate: Date): string => {
  const startFormatted = startDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
  const endFormatted = endDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
  return `${startFormatted} - ${endFormatted}`
}

const formatYearRange = (startDate: Date, endDate: Date): string => {
  const sameYear = startDate.getFullYear() === endDate.getFullYear()
  if (sameYear) {
    return startDate.getFullYear().toString()
  } else {
    return `${startDate.getFullYear()}-${endDate.getFullYear()}`
  }
}

export const DateRangePill = ({ startDate, endDate }: DateRangePillProps) => {
  return (
    <PillWrapper>
      <Container>{formatDateRange(startDate, endDate)}</Container>
      <YearContainer>{formatYearRange(startDate, endDate)}</YearContainer>
    </PillWrapper>
  )
}

const PillWrapper = styled.div`
  display: flex;
  width: fit-content;
`

const Container = styled.div`
  width: fit-content;
  padding: 2px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  border: 1px solid var(--gray-light);
  background: transparent;
  color: var(--white);
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`

const YearContainer = styled.div`
  margin-left: -1px;
  width: fit-content;
  padding: 2px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  border: 1px solid var(--gray-light);
  background: transparent;
  color: var(--white);
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`
