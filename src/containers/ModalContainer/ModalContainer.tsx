import styled from '@emotion/styled'
import { Modal, ModalProps } from '../../components/Modal/Modal'

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
`
