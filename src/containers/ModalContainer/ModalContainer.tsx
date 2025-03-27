import styled from '@emotion/styled'
import { Modal, ModalProps } from '../../components/Modal/Modal'
import { breakpoints } from '../../configs/ui.configs'

export const ModalContainer = (props: ModalProps) => {
  return (
    <Overlay>
      <Modal {...props} />
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  @media (max-width: ${breakpoints.sm}px) {
    align-items: flex-end;
    padding: 0 16px 16px;

    > div {
      width: 100%;
    }
  }
`
