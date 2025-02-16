import styled from '@emotion/styled'

export type TitleBlockProps = {
  title: string
  description?: string
}

export const TitleBlock = ({ title, description }: TitleBlockProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: var(--gray-darker);
  border-radius: 8px;
`

const Title = styled.span`
  font-size: var(--body1-font-size);
  line-height: var(--body1-line-height);
`

const Description = styled.p`
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
  opacity: 0.5;
`
