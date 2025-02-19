import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { Input } from '@/components/Input'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { ActionContainer } from '@/components/StyledComponents'
import { WalletPanel } from '@/components/WalletPanel'
import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import React from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'

export const QnaCreate: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom)

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <WalletPanel
          isAuthorized={isAuthorized}
          onConnect={() => setIsAuthorized(true)}
        />
        <NameSection>
          <Title>Give it name</Title>
          <Input placeholder="New Q&A.." />
        </NameSection>
        <Section>
          <Collapsible title="Add description">
            <TextArea placeholder="Type something here.." />
          </Collapsible>
          <Collapsible title="Review password">
            <Stack>
              <Text>Generated automatically for encrypted Q&As</Text>
              <PasswordGenerator key="password-generator" />
            </Stack>
          </Collapsible>
        </Section>
      </Main>
      <ActionContainer>
        <StyledButton variant="filledPrimary" size="large">
          Create
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
  gap: 48px;
  height: 100%;
  width: 507px;
  overflow-y: auto;
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
