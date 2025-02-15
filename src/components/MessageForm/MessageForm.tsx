import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'

import { MessageFormSubmitHandler } from '@/types/form.types'
import { Button } from '../Button'
import { ProfileIcon } from '../ProfileIcon'
import { ToggleButton } from '../ToggleButton'

export type MessageFormProps = {
  isAuthorized?: boolean
  onSubmit: MessageFormSubmitHandler
  messagePlaceholder?: string
  namePlaceholder?: string
}

export const MessageForm = ({
  isAuthorized = false,
  onSubmit,
  messagePlaceholder = 'Write your message',
  namePlaceholder = 'Enter your name (optional)',
}: MessageFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current?.contains(event.target as Node)) return
      if (!message.trim() && !name.trim()) setIsFocused(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [message, name])

  const resetForm = () => {
    setMessage('')
    setName('')
    setIsAnonymous(false)
    setIsFocused(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) return

    onSubmit?.({
      message: message.trim(),
      isAnonymous,
      resetForm,
      name: name.trim() || undefined,
    })
  }

  return (
    <FormContainer ref={formRef} onSubmit={handleSubmit}>
      <InputContainer $isFocused={isFocused}>
        <MessageInput
          placeholder={messagePlaceholder}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          onFocus={() => setIsFocused(true)}
          $isFocused={isFocused}
        />
        {isFocused && (
          <ActionsContainer>
            <ProfileIcon character={name || 'A'} />
            <NameInput
              placeholder={namePlaceholder}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              $isFocused={isFocused}
            />
            <ButtonsContainer>
              {!isAuthorized && <Button variant="filled">Authorize</Button>}
              <Button variant="filledPrimary" type="submit">
                Send
              </Button>
            </ButtonsContainer>
          </ActionsContainer>
        )}
      </InputContainer>
      {isAuthorized && isFocused && (
        <ToggleContainer>
          <ToggleButton isOn={isAnonymous} onChange={setIsAnonymous} />
          <ToggleText>Send anonymously</ToggleText>
        </ToggleContainer>
      )}
    </FormContainer>
  )
}

const FormContainer = styled.form`
  width: 100%;
`

const InputContainer = styled.div<{ $isFocused: boolean }>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
  background-color: ${({ $isFocused }) =>
    $isFocused ? 'var(--gray-darkest)' : 'var(--gray-ultradark)'};
  transition: background-color 0.2s ease;
`

const MessageInput = styled.input<{ $isFocused: boolean }>`
  width: 100%;
  background: none;
  border: none;
  outline: none;

  font-size: ${({ $isFocused }) =>
    $isFocused ? 'var(--body2-font-size)' : 'var(--h3-font-size)'};
  line-height: ${({ $isFocused }) =>
    $isFocused ? 'var(--body2-line-height)' : 'var(--h3-line-height)'};

  &::placeholder {
    opacity: 0.4;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

const NameInput = styled(MessageInput)`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`

const ButtonsContainer = styled.div`
  display: flex;
`

const ToggleContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`

const ToggleText = styled.span`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  opacity: 0.7;
`
