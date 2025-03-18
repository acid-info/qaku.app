import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { ActionContainer, StyledInput } from '@/components/StyledComponents'
import TagInput from '@/components/TagInput/TagInput'
import { WalletPanel } from '@/components/WalletPanel'
import { createQnA } from '@/utils/api.utils'
import styled from '@emotion/styled'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'
import { qnasRecordAtom } from '../../../atoms/qna/qnasRecordAtom'
import { userAtom } from '../../../atoms/user/userAtom'

export const QnaCreate: React.FC = () => {
  const user = useAtomValue(userAtom)
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom)
  const setQnasRecord = useSetAtom(qnasRecordAtom)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [coHosts, setCoHosts] = useState<string[]>([])

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
  }

  const handleCreateQnA = async () => {
    if (!title.trim()) {
      setError('Please provide a title for your Q&A')
      return
    }

    if (!isAuthorized) {
      setError('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await createQnA({
        title,
        description: description || undefined,
        owner: user.id,
        hash: password,
        coHosts: coHosts.length ? coHosts : undefined,
        setQnasRecord,
      })

      if (response.success && response.data) {
        router.push(`/qna/live/${response.data.id}`)
      } else {
        setError(response.error || 'Failed to create Q&A')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Content>
          {error && <Badge title={error} variant="red" />}
          <WalletPanel
            isAuthorized={isAuthorized}
            onConnect={() => setIsAuthorized(true)}
          />
          <NameSection>
            <Title>Give it name</Title>
            <StyledInput
              placeholder="New Q&A.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </NameSection>
          <Section>
            <Collapsible title="Add description">
              <TextArea
                placeholder="Type something here.."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Collapsible>
            <Collapsible title="Review password">
              <Stack>
                <Text>Generated automatically for encrypted Q&As</Text>
                <PasswordGenerator
                  key="password-generator"
                  onChange={handlePasswordChange}
                />
              </Stack>
            </Collapsible>
            <Collapsible title="Add co-hosts">
              <Stack>
                <Text>
                  Co-hosts can moderate discussions, approve or delete
                  questions, and ensure smooth interaction. Simply paste the
                  user&apos;s Qaku address to add one.
                </Text>
                <TagInput tags={coHosts} setTags={setCoHosts} />
              </Stack>
            </Collapsible>
          </Section>
        </Content>
      </Main>
      <ActionContainer>
        <StyledButton
          variant="filledPrimary"
          size="large"
          onClick={handleCreateQnA}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </StyledButton>
      </ActionContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 100%;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 507px;
`

const NameSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  margin-bottom: 16px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const TextArea = styled.textarea`
  height: 100px;
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Text = styled.span`
  color: var(--white);
  opacity: 0.7;
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);
`

const StyledButton = styled(Button)`
  width: 200px;
`
