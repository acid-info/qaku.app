import styled from '@emotion/styled'

export type PillVariantType = 'orange' | 'green'

type VariantConfigType = {
  backgroundColor: string
  textColor: string
}

const VARIANT_CONFIG: Record<PillVariantType, VariantConfigType> = {
  orange: {
    backgroundColor: 'var(--orange)',
    textColor: 'var(--black)',
  },
  green: {
    backgroundColor: 'var(--green)',
    textColor: 'var(--black)',
  },
}

interface PillProps {
  title: string
  variant: PillVariantType
}

export const Pill = ({ title, variant }: PillProps) => {
  return <PillContainer variant={variant}>{title}</PillContainer>
}

const PillContainer = styled.div<{ variant: PillVariantType }>`
  display: flex;
  background-color: ${({ variant }) => VARIANT_CONFIG[variant].backgroundColor};
  color: ${({ variant }) => VARIANT_CONFIG[variant].textColor};
  border-radius: 32px;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  text-transform: capitalize;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
`
