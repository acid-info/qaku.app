import styled from '@emotion/styled'
import React from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { ToggleButton } from '../ToggleButton'
import { FloatingPanel } from './FloatingPanel'

export type QnaLiveFloatingPanelProps = {
  isOpen: boolean
  onClose: () => void
}

export const QnaLiveFloatingPanel: React.FC<QnaLiveFloatingPanelProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <FloatingPanel title="Q&A settings" isOpen={isOpen} onClose={onClose}>
      <SettingsContent>
        <TextWithToggleContainer>
          <TextContainer>
            <h3>Replies</h3>
            <Description>Allow participants to reply to questions</Description>
          </TextContainer>
          <ToggleButton isOn={true} />
        </TextWithToggleContainer>
        <Section>
          <TextWithInputContainer>
            <TextContainer>
              <h3>Q&A title</h3>
              <Description>Edit your Q&A title here</Description>
            </TextContainer>
            <Input placeholder="Type something here.." />
          </TextWithInputContainer>
          <TextWithInputContainer>
            <TextWithToggleContainer>
              <TextContainer>
                <h3>Q&A description</h3>
                <Description>Add a description</Description>
              </TextContainer>
              <ToggleButton isOn={true} />
            </TextWithToggleContainer>
            <Input placeholder="Type something here.." />
          </TextWithInputContainer>
        </Section>
        <ButtonContainer>
          <Button variant="filledPrimary">Save</Button>
        </ButtonContainer>
      </SettingsContent>
    </FloatingPanel>
  )
}

const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-top: 48px;
  width: 100%;
  height: 100%;
`

const TextWithToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  h3 {
    margin: 0 !important;
  }
`

const Description = styled.span`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  color: var(--white);
  opacity: 0.7;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const TextWithInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: auto;
`
