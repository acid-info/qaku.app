import { defaultQnaSettings } from '@/../atoms/settings/qna'
import {
  BaseFloatingPanelPropsInterface,
  QnaSettingsInterface,
  SaveHandlerType,
} from '@/types/settings.types'
import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { CloseIcon } from '../Icons/CloseIcon'
import { StyledInput } from '../StyledComponents'
import TagInput from '../TagInput/TagInput'
import { ToggleButton } from '../ToggleButton'
import { FloatingPanel } from './FloatingPanel'
import { SettingField } from './SettingItem'
import {
  ActionBar,
  PanelContent,
  SettingGroup,
  SettingStack,
  TagInputContainer,
} from './styledComponents'

export interface QnaFloatingPanelCreateProps
  extends BaseFloatingPanelPropsInterface {
  initialValues?: Partial<QnaSettingsInterface>
  onSave: SaveHandlerType<QnaSettingsInterface>
}

export const QnaFloatingPanelCreate: React.FC<QnaFloatingPanelCreateProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSave,
}) => {
  const [values, setValues] = useState<QnaSettingsInterface>({
    ...defaultQnaSettings,
    ...initialValues,
  })

  useEffect(() => {
    if (isOpen && initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }))
    }
  }, [isOpen, initialValues])

  const handleRepliesToggle = (isOn: boolean) => {
    setValues((prev) => ({ ...prev, allowsParticipantsReplies: isOn }))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value || defaultQnaSettings.title
    setValues((prev) => ({ ...prev, title: newTitle }))
  }

  const handleDescriptionToggle = (isOn: boolean) => {
    if (!isOn) {
      setValues((prev) => ({
        ...prev,
        showDescription: isOn,
        description: '',
      }))
    } else {
      setValues((prev) => ({ ...prev, showDescription: isOn }))
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }

  const handleSave = () => {
    if (values.description.trim() === '') {
      const updatedValues = {
        ...values,
        showDescription: false,
        description: '',
      }
      setValues(updatedValues)
      onSave(updatedValues)
    } else {
      onSave(values)
    }
    onClose()
  }

  const handleClose = () => {
    if (initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }))
    }
    onClose()
  }

  return (
    <FloatingPanel title="Q&A settings" isOpen={isOpen} onClose={handleClose}>
      <PanelContent>
        <SettingField
          title="Replies"
          description="Allow participants to reply to questions"
          isRow
        >
          <ToggleButton
            isOn={values.allowsParticipantsReplies}
            onChange={handleRepliesToggle}
          />
        </SettingField>

        <SettingGroup>
          <SettingStack>
            <SettingField
              title="Q&A title"
              description="Edit your Q&A title here"
            >
              <StyledInput
                placeholder="Type something here.."
                value={values.title}
                onChange={handleTitleChange}
              />
            </SettingField>
          </SettingStack>

          <SettingField
            title="Q&A description"
            description="Add a description"
            isRow
          >
            <ToggleButton
              isOn={values.showDescription}
              onChange={handleDescriptionToggle}
            />
          </SettingField>
          {values.showDescription && (
            <StyledInput
              placeholder="Type something here.."
              value={values.description}
              onChange={handleDescriptionChange}
            />
          )}
        </SettingGroup>

        <SettingStack>
          <SettingField
            title="Co-hosts"
            description="Add co-hosts to your Q&A"
            isRow
          >
            {values.admins.length > 0 && (
              <Button
                variant="filled"
                onClick={() => setValues((prev) => ({ ...prev, admins: [] }))}
                icon={<CloseIcon />}
              >
                RevokeAll
              </Button>
            )}
          </SettingField>
          <TagInputContainer>
            <TagInput
              tags={values.admins}
              setTags={(tags) =>
                setValues((prev) => ({ ...prev, admins: tags }))
              }
              validator={(value) => value.startsWith('0x')}
              onValidationFail={() => alert('Invalid address')}
            />
          </TagInputContainer>
        </SettingStack>

        <ActionBar>
          <Button variant="filledPrimary" onClick={handleSave}>
            Save
          </Button>
        </ActionBar>
      </PanelContent>
    </FloatingPanel>
  )
}
