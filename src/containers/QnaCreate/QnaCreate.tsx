import { qnasRecordAtom } from '@/../atoms/qna/qnasRecordAtom'
import { walletStateAtom } from '@/../atoms/wallet'
import { useWalletConnection } from '@/../hooks/useWalletConnection'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { QnaScheduleFloatingPanel } from '@/components/FloatingPanel'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { ActionContainer, StyledInput } from '@/components/StyledComponents'
import TagInput from '@/components/TagInput/TagInput'
import { WalletPanel } from '@/components/WalletPanel'
import { qna } from '@/data/routes'
import { WalletConnectionStatusEnum } from '@/types/wallet.types'
import { createQnA } from '@/utils/api.utils'
import styled from '@emotion/styled'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export const QnaCreate: React.FC<{
  isSchedulePanelOpen: boolean
  setIsSchedulePanelOpen: (isOpen: boolean) => void
}> = ({ isSchedulePanelOpen, setIsSchedulePanelOpen }) => {
  const { userName } = useAtomValue(walletStateAtom)
  const { status } = useAtomValue(walletStateAtom)
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const { openWalletPanel } = useWalletConnection()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [admins, setAdmins] = useState<string[]>([])

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
  }

  const createQnAWithRedirect = async (params: {
    startDate?: Date
    endDate?: Date
    redirectRoute: string
  }) => {
    const { startDate, endDate, redirectRoute } = params

    if (!title.trim()) {
      setError('Please provide a title for your Q&A')
      return
    }

    if (status !== WalletConnectionStatusEnum.Connected || !userName) {
      setError('Please connect your wallet first')
      return
    }

    if (startDate && endDate) {
      if (startDate < new Date()) {
        setError('Start date cannot be in the past')
        return
      }

      if (endDate <= startDate) {
        setError('End date must be after start date')
        return
      }
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await createQnA({
        title,
        description: description || undefined,
        owner: userName,
        hash: password,
        admins: admins.length ? admins : undefined,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        setQnasRecord,
      })

      if (response.success && response.data) {
        router.push(redirectRoute.replace(':id', String(response.data.id)))
      } else {
        setError('Failed to create Q&A')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSchedule = async (startDate: Date, endDate: Date) => {
    await createQnAWithRedirect({
      startDate,
      endDate,
      redirectRoute: qna.CREATED,
    })
  }

  const handleCreateQnA = async () => {
    await createQnAWithRedirect({
      redirectRoute: qna.LIVE,
    })
  }

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Content>
          {error && <Badge title={error} variant="red" />}
          <WalletPanel
            isAuthorized={status === WalletConnectionStatusEnum.Connected}
            onConnect={openWalletPanel}
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
                <TagInput
                  tags={admins}
                  setTags={setAdmins}
                  validator={(value) => value.startsWith('0x')}
                  onValidationFail={() => alert('Invalid address')}
                />
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
      <QnaScheduleFloatingPanel
        isOpen={isSchedulePanelOpen}
        onClose={() => setIsSchedulePanelOpen(false)}
        onSchedule={handleSchedule}
      />
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
