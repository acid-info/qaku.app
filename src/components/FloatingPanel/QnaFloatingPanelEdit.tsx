import { defaultQnaSettings } from '@/../atoms/settings/qna'
import { QnAType } from '@/types/qna.types'
import {
  BaseFloatingPanelPropsInterface,
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

interface QnaEditValuesType {
  allowsParticipantsReplies: boolean
  title: string
  showDescription: boolean
  description: string
  admins: string[]
}

export interface QnaFloatingPanelProps extends BaseFloatingPanelPropsInterface {
  qna: QnAType
  onSave: SaveHandlerType<Partial<QnAType>>
}

export const QnaFloatingPanelEdit: React.FC<QnaFloatingPanelProps> = ({
  isOpen,
  onClose,
  qna,
  onSave,
}) => {
  const [values, setValues] = useState<QnaEditValuesType>({
    ...defaultQnaSettings,
  })

  useEffect(() => {
    if (isOpen && qna) {
      setValues({
        allowsParticipantsReplies: qna.allowsParticipantsReplies,
        title: qna.title,
        showDescription: !!qna.description,
        description: qna.description || '',
        admins: qna.admins || [],
      })
    }
  }, [isOpen, qna])

  const handleSave = () => {
    const updatedQna: Partial<QnAType> = {
      allowsParticipantsReplies: values.allowsParticipantsReplies,
      title: values.title,
      admins: values.admins.length > 0 ? values.admins : undefined,
      hasAdmins: values.admins.length > 0,
    }

    if (
      values.showDescription &&
      values.description &&
      values.description.trim() !== ''
    ) {
      updatedQna.description = values.description
    } else {
      updatedQna.description = undefined
    }

    onSave(updatedQna)
  }

  const handleClose = () => {
    if (qna) {
      setValues({
        allowsParticipantsReplies: qna.allowsParticipantsReplies,
        title: qna.title,
        showDescription: !!qna.description,
        description: qna.description || '',
        admins: qna.admins || [],
      })
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
            onChange={(isOn) =>
              setValues((prev) => ({
                ...prev,
                allowsParticipantsReplies: isOn,
              }))
            }
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
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </SettingField>
          </SettingStack>

          <SettingStack>
            <SettingField
              title="Q&A description"
              description="Add a description"
              isRow
            >
              <ToggleButton
                isOn={values.showDescription}
                onChange={(isOn) =>
                  setValues((prev) => ({ ...prev, showDescription: isOn }))
                }
              />
            </SettingField>
            {values.showDescription && (
              <StyledInput
                placeholder="Type something here.."
                value={values.description}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            )}
          </SettingStack>
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
