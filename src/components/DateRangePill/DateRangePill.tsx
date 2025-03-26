import styled from '@emotion/styled'

export interface DateRangePillProps {
  startDate: Date
  endDate: Date
}

const formatDateRange = (startDate: Date, endDate: Date): string => {
  const sameYear = startDate.getFullYear() === endDate.getFullYear()

  if (sameYear) {
    const startFormatted = startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    const endFormatted = endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    return `${startFormatted} - ${endFormatted}, ${startDate.getFullYear()}`
  } else {
    const startFormatted = startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    const endFormatted = endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    return `${startFormatted} - ${endFormatted}`
  }
}

export const DateRangePill = ({ startDate, endDate }: DateRangePillProps) => {
  return <Container>{formatDateRange(startDate, endDate)}</Container>
}

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
