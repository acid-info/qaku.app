import styled from '@emotion/styled'
import React from 'react'

import { CloseIcon } from '@/components/Icons/CloseIcon'
import { MessageForm } from '@/components/MessageForm'

export type ThreadItemReplyProps = {
  onClose?: () => void
  onSubmit: (params: {
    message: string
    isAnonymous: boolean
    resetForm: () => void
    name?: string
  }) => void
  isAuthorized?: boolean
}

export const ThreadItemReply: React.FC<ThreadItemReplyProps> = ({
  onClose,
  onSubmit,
  isAuthorized = false,
}) => {
  return (
    <Container>
      <Header>
        <Text>Thread</Text>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Header>
      <MessageForm
        onSubmit={onSubmit}
        isAuthorized={isAuthorized}
        messagePlaceholder="Write your reply"
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--gray);
  border-top: none;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Text = styled.span`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
`
