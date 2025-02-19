import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ActionContainer } from '@/components/StyledComponents'
import { WalletPanel } from '@/components/WalletPanel'
import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import React from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'

export const SettingsPage: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom)
  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Column>
          <WalletPanel
            isAuthorized={isAuthorized}
            onConnect={() => setIsAuthorized(true)}
          />
          <div className="settings-input">
            <div>
              <h3>Codex Node URL</h3>
              <p>Used to publish your Q&A snapshots</p>
            </div>
            <Input placeholder="http://localhost:8080" />
          </div>
          <div className="settings-input">
            <div>
              <h3>URL of Public Qaku Cache Node</h3>
              <p>
                Used to pull your Q&A snapshots if local node is not available
              </p>
            </div>
            <Input placeholder="https://api.qaku.app" />
          </div>
        </Column>
      </Main>
      <ActionContainer>
        <StyledButton size="large" variant="filledPrimary">
          Save
        </StyledButton>
      </ActionContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;

  gap: 48px;
  width: 100%;
  max-width: 507px;

  .settings-input {
    display: flex;
    flex-direction: column;
    gap: 16px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    & > div > p {
      font-size: var(--body2-font-size);
      line-height: var(--body2-line-height);
      opacity: 0.7;
    }
  }
`

const StyledButton = styled(Button)`
  width: 200px;
`
