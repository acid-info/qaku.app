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

export interface QnaFloatingPanelProps extends BaseFloatingPanelPropsInterface {
  initialValues?: Partial<QnaSettingsInterface>
  onSave: SaveHandlerType<QnaSettingsInterface>
}

export const QnaFloatingPanel: React.FC<QnaFloatingPanelProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSave,
}) => {
  const [values, setValues] = useState<QnaSettingsInterface>({
    allowReplies: true,
    title: '',
    showDescription: false,
    description: '',
    coHosts: [],
    ...initialValues,
  })

  useEffect(() => {
    if (initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }))
    }
  }, [initialValues])

  const handleSave = () => {
    onSave(values)
    onClose()
  }

  return (
    <FloatingPanel title="Q&A settings" isOpen={isOpen} onClose={onClose}>
      <PanelContent>
        <SettingField
          title="Replies"
          description="Allow participants to reply to questions"
          isRow
        >
          <ToggleButton
            isOn={values.allowReplies}
            onChange={(isOn) =>
              setValues((prev) => ({ ...prev, allowReplies: isOn }))
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
            description="Edit your Q&A title"
            isRow
          >
            {values.coHosts.length > 0 && (
              <Button
                variant="filled"
                onClick={() => setValues((prev) => ({ ...prev, coHosts: [] }))}
                icon={<CloseIcon />}
              >
                RevokeAll
              </Button>
            )}
          </SettingField>
          <TagInputContainer>
            <TagInput
              tags={values.coHosts}
              setTags={(tags) =>
                setValues((prev) => ({ ...prev, coHosts: tags }))
              }
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
