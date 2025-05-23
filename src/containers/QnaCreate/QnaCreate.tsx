import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { qnasRecordAtom } from '@/../atoms/qna/qnasRecordAtom'
import { defaultQnaSettings, qnaSettingsAtom } from '@/../atoms/settings/qna'
import { walletStateAtom } from '@/../atoms/wallet'
import { useWalletConnection } from '@/../hooks/useWalletConnection'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import DesktopOnly from '@/components/DesktopOnly/DesktopOnly'
import { QnaScheduleFloatingPanel } from '@/components/FloatingPanel'
import { IconButtonRound } from '@/components/IconButtonRound'
import { CalendarIcon } from '@/components/Icons/CalendarIcon'
import { SettingsIcon } from '@/components/Icons/SettingsIcon'
import MobileOnly from '@/components/MobileOnly/MobileOnly'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { ActionContainer, StyledInput } from '@/components/StyledComponents'
import TagInput from '@/components/TagInput/TagInput'
import { WalletPanel, WalletPanelMobile } from '@/components/WalletPanel'
import { breakpoints } from '@/configs/ui.configs'
import { QnA } from '@/data/routes'
import { WalletConnectionStatusEnum } from '@/types/wallet.types'
import { createQnA } from '@/utils/api.utils'
import styled from '@emotion/styled'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

// Default form data for creating a QnA
const defaultFormData = {
  title: '',
  description: '',
  password: '',
  admins: [],
  useExternalWallet: true,
}

export const QnaCreate: React.FC<{
  isSchedulePanelOpen: boolean
  setIsSchedulePanelOpen: (isOpen: boolean) => void
}> = ({ isSchedulePanelOpen, setIsSchedulePanelOpen }) => {
  const { userName, localAddress, status } = useAtomValue(walletStateAtom)
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const setIsSettingsPanelOpen = useSetAtom(isSettingsPanelOpenAtom)
  const { openWalletPanel } = useWalletConnection()
  const [qnaSettings, setQnaSettings] = useAtom(qnaSettingsAtom)

  const [title, setTitle] = useState(defaultFormData.title)
  const [description, setDescription] = useState(defaultFormData.description)
  const [password, setPassword] = useState(defaultFormData.password)
  const [isLoading, setIsLoading] = useState(false)
  const [admins, setAdmins] = useState<string[]>(defaultFormData.admins)
  const [useExternalWallet, setUseExternalWallet] = useState(
    defaultFormData.useExternalWallet,
  )

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setTitle(qnaSettings.title)
    setDescription(qnaSettings.description)
    setAdmins(qnaSettings.admins)
  }, [qnaSettings])

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setQnaSettings((prev) => ({
      ...prev,
      title: newTitle,
    }))
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newDescription = e.target.value
    setDescription(newDescription)
    setQnaSettings((prev) => ({
      ...prev,
      description: newDescription,
      showDescription: newDescription.trim() !== '',
    }))
  }

  const handleAdminsChange = (newAdmins: string[]) => {
    setAdmins(newAdmins)
    setQnaSettings((prev) => ({
      ...prev,
      admins: newAdmins,
    }))
  }

  const handleWalletSelect = (walletType: 'external' | 'qaku') => {
    setUseExternalWallet(walletType === 'external')
  }

  const getOwnerAddress = () => {
    if (status === WalletConnectionStatusEnum.Connected && useExternalWallet) {
      return userName || localAddress
    }
    return localAddress
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
        owner: getOwnerAddress(),
        hash: password,
        admins: admins.length ? admins : undefined,
        allowsParticipantsReplies: qnaSettings.allowsParticipantsReplies,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        setQnasRecord,
      })

      if (response.success && response.data) {
        resetFormData()
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
      redirectRoute: QnA.CREATED,
    })
  }

  const handleCreateQnA = async () => {
    await createQnAWithRedirect({
      redirectRoute: QnA.LIVE,
    })
  }

  const resetFormData = () => {
    setTitle(defaultFormData.title)
    setDescription(defaultFormData.description)
    setPassword(defaultFormData.password)
    setAdmins(defaultFormData.admins)
    setUseExternalWallet(defaultFormData.useExternalWallet)
    setQnaSettings(defaultQnaSettings)
  }

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Content>
          {error && <Badge title={error} variant="red" />}
          <DesktopOnly>
            <WalletPanel
              isAuthorized={status === WalletConnectionStatusEnum.Connected}
              onConnect={openWalletPanel}
              onWalletSelect={handleWalletSelect}
              selectedWallet={useExternalWallet ? 'external' : 'qaku'}
            />
          </DesktopOnly>
          <MobileOnly>
            <WalletPanelMobile
              isAuthorized={status === WalletConnectionStatusEnum.Connected}
              onConnect={openWalletPanel}
              onWalletSelect={handleWalletSelect}
              selectedWallet={useExternalWallet ? 'external' : 'qaku'}
            />
          </MobileOnly>
          <NameSection>
            <Title>Give it name</Title>
            <StyledInput
              placeholder="New Q&A.."
              value={title}
              onChange={handleTitleChange}
            />
          </NameSection>
          <Section>
            <Collapsible title="Add description">
              <TextArea
                placeholder="Type something here.."
                value={description}
                onChange={handleDescriptionChange}
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
                  setTags={handleAdminsChange}
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
        <MobileOnly>
          <MobileButtonsContainer>
            <IconButtonRound
              icon={<SettingsIcon />}
              onClick={() => setIsSettingsPanelOpen(true)}
            />
            <IconButtonRound
              icon={<CalendarIcon />}
              onClick={() => setIsSchedulePanelOpen(true)}
            />
          </MobileButtonsContainer>
        </MobileOnly>
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

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 16px;
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: ${breakpoints.sm}px) {
    padding-top: 8px !important;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 507px;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
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

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const MobileButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
