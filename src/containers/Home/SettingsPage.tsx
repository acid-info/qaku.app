import { Button } from '@/components/Button'
import { MessageForm } from '@/components/MessageForm'
import { WalletPanel } from '@/components/WalletPanel'
import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import React from 'react'
import { isAuthorizedAtom } from '../../../atoms/navbar/isAuthorizedAtom'

export const SettingsPage: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom)
  return (
    <Wrapper>
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
          <MessageForm
            onSubmit={() => {
              console.log('submit')
            }}
            messagePlaceholder="http://localhost:8080"
            namePlaceholder=""
          />
        </div>
        <div className="settings-input">
          <div>
            <h3>URL of Public Qaku Cache Node</h3>
            <p>
              Used to pull your Q&A snapshots if local node is not available
            </p>
          </div>
          <MessageForm
            onSubmit={() => {
              console.log('submit')
            }}
            messagePlaceholder="https://api.qaku.app"
            namePlaceholder=""
          />
        </div>
        <Button className="save-button" size="large" variant="filledPrimary">
          Save
        </Button>
      </Column>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 52px 16px;

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

  .save-button {
    width: 200px;
    margin: 72px auto 0;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  max-width: 507px;
  margin: 0 auto;
`
