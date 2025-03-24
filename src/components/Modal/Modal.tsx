import styled from '@emotion/styled'
import { Button } from '../Button'

export type ModalProps = {
  title?: string
  description?: string
  mainAction?: React.ReactNode
  onCancel: () => void
}

export const Modal = ({
  title,
  description,
  mainAction,
  onCancel,
}: ModalProps) => {
  return (
    <Container>
      <TextContainer>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </TextContainer>
      <ActionsContainer>
        {mainAction && mainAction}
        <CancelButton variant="outlined" onClick={onCancel}>
          Cancel
        </CancelButton>
      </ActionsContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 434px;
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-radius: 8px;
  border: 1px solid var(--gray);
  background-color: var(--gray-darker);
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    margin: 0;
  }

  p {
    opacity: 0.7;
    font-size: var(--body2-font-size);
    line-height: var(--body2-line-height);
  }
`

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;

  button {
    width: 100%;
  }
`

const CancelButton = styled(Button)`
  color: color-mix(in srgb, var(--white) 80%, transparent);
  border: none;
`
