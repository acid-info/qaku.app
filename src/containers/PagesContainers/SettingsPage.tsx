import { walletStateAtom } from '@/../atoms/wallet'
import { Button } from '@/components/Button'
import { CopyIcon } from '@/components/Icons/CopyIcon'
import {
  ActionContainer,
  Row,
  StyledInput,
} from '@/components/StyledComponents'
import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import React from 'react'

export const SettingsPage: React.FC = () => {
  const { address } = useAtomValue(walletStateAtom)

  const handleCopy = () => {
    navigator.clipboard.writeText(address || '')

    alert('Key copied to clipboard')
  }

  return (
    <Wrapper>
      <Main className="scrollable-container">
        <Column>
          <KeyManagement>
            <h3>Key Management</h3>
            <div className="wrapper">
              <Key>
                <span>{address}</span>
                <IconContainer onClick={handleCopy}>
                  <CopyIcon />
                </IconContainer>
              </Key>
              <Row className="button-group">
                <Button variant="filled">Export Private Key</Button>
                <Button variant="filled">Import Private Key</Button>
              </Row>
            </div>
          </KeyManagement>
          <div className="settings-input">
            <div>
              <h3>Codex Node URL</h3>
              <p>Used to publish your Q&A snapshots</p>
            </div>
            <StyledInput placeholder="http://localhost:8080" />
          </div>
          <div className="settings-input">
            <div>
              <h3>URL of Public Qaku Cache Node</h3>
              <p>
                Used to pull your Q&A snapshots if local node is not available
              </p>
            </div>
            <StyledInput placeholder="https://api.qaku.app" />
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

const KeyManagement = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;

  border-radius: 8px;
  background: var(--gray-darker);

  .wrapper {
    width: 100%;
  }

  .button-group {
    button {
      width: 100%;
    }
  }
`

const Key = styled.div`
  display: flex;
  padding: 24px 16px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  align-self: stretch;
  background: var(--gray-ultradark);
`

const IconContainer = styled.div`
  cursor: pointer;
`
