import styled from '@emotion/styled'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { Dropdown } from '@/components/Dropdown'
import { IconButtonRound } from '@/components/IconButtonRound'
import { ChatBubbleOutlineIcon } from '@/components/Icons/ChatBubbleOutlineIcon'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { MessageForm } from '@/components/MessageForm'
import { Search } from '@/components/Search'
import { ToggleButton } from '@/components/ToggleButton'
import { TogglePill } from '@/components/TogglePill'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const TestContainer: React.FC<HomePageProps> = ({
  children,
  ...props
}) => {
  const [toggleState, setToggleState] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | number>()
  const [selectedTheme, setSelectedTheme] = useState<string | number>()
  const [pillState, setPillState] = useState<{
    state1: [number, boolean]
    state2: [number, boolean]
    state3: [number, boolean]
  }>({
    state1: [42, false],
    state2: [24, true],
    state3: [1000, false],
  })

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
  ]

  const themeOptions = [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ]

  const handleLanguageChange = (value: string | number) => {
    setSelectedLanguage(value)
  }

  const handleThemeChange = (value: string | number) => {
    setSelectedTheme(value)
  }

  return (
    <Container {...props}>
      <Separator style={{ marginTop: '0' }}>Patterns</Separator>
      <Section>
        <h2>Collapsible</h2>
        <ButtonGroup
          style={{ flexDirection: 'column', gap: '16px', width: '500px' }}
        >
          <Collapsible title="Add description">
            <textarea
              style={{ height: '100px' }}
              placeholder="Type something here.."
            />
          </Collapsible>
          <Collapsible title="Some collapsible">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <Button variant="filledPrimary">A button</Button>
              <Search />
            </div>
          </Collapsible>
          <Collapsible title="Default expanded" defaultExpanded>
            <div>This content is visible by default.</div>
          </Collapsible>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>Message Form</h2>
        <ButtonGroup style={{ alignItems: 'flex-start' }}>
          <div style={{ width: '500px' }}>
            <h3>Unauthorized</h3>
            <MessageForm
              onSubmit={({ message, isAnonymous, resetForm, name }) => {
                console.log(
                  'Unauthorized message:',
                  message,
                  'Name:',
                  name,
                  'isAnonymous:',
                  isAnonymous,
                )
                resetForm()
              }}
              messagePlaceholder="Write something..."
              namePlaceholder="Name... (opt.)"
            />
          </div>
          <div style={{ width: '500px' }}>
            <h3>Authorized</h3>
            <MessageForm
              isAuthorized
              onSubmit={({ message, isAnonymous, resetForm, name }) => {
                console.log(
                  'Authorized message:',
                  message,
                  'Name:',
                  name,
                  'isAnonymous:',
                  isAnonymous,
                )
                resetForm()
              }}
            />
          </div>
        </ButtonGroup>
      </Section>

      <Separator>Components</Separator>
      <Section>
        <h2>Dropdowns</h2>
        <ButtonGroup>
          <DropdownWrapper>
            <h3>Filled</h3>
            <Dropdown
              options={languageOptions}
              value={selectedLanguage}
              onChange={handleLanguageChange}
              placeholder="Select Language"
            />
          </DropdownWrapper>
          <DropdownWrapper style={{ width: '130px' }}>
            <h3>Outlined</h3>
            <Dropdown
              options={themeOptions}
              value={selectedTheme}
              onChange={handleThemeChange}
              variant="outlined"
              placeholder="Select Theme"
            />
          </DropdownWrapper>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>Search</h2>
        <ButtonGroup>
          <Search onSearch={(value) => console.log('Search:', value)} />
          <Search
            label="Find Something"
            placeholder="Enter keywords..."
            onSearch={(value) => console.log('Search:', value)}
          />
        </ButtonGroup>
      </Section>

      <Section>
        <h2>Toggle Button</h2>
        <ToggleButton isOn={toggleState} onChange={setToggleState} />
      </Section>

      <Section>
        <h2>Toggle Pills</h2>
        <ButtonGroup>
          <TogglePill
            count={pillState.state1[0]}
            isActive={pillState.state1[1]}
            onClick={() => {
              const newCount = pillState.state1[1]
                ? pillState.state1[0] - 1
                : pillState.state1[0] + 1
              setPillState({
                ...pillState,
                state1: [newCount, !pillState.state1[1]],
              })
            }}
          />
          <TogglePill
            count={pillState.state2[0]}
            isActive={pillState.state2[1]}
            icon={<ChatBubbleOutlineIcon />}
            activeIcon={<ChatBubbleOutlineIcon />}
            onClick={() => {
              const newCount = pillState.state2[1]
                ? pillState.state2[0] - 1
                : pillState.state2[0] + 1
              setPillState({
                ...pillState,
                state2: [newCount, !pillState.state2[1]],
              })
            }}
          />
          <TogglePill
            count={pillState.state3[0]}
            isActive={pillState.state3[1]}
            icon={<ChatBubbleOutlineIcon />}
            activeIcon={<ChatBubbleOutlineIcon />}
            onClick={() => {
              const newCount = pillState.state3[1]
                ? pillState.state3[0] - 1
                : pillState.state3[0] + 1
              setPillState({
                ...pillState,
                state3: [newCount, !pillState.state3[1]],
              })
            }}
          />
        </ButtonGroup>
      </Section>

      <Section>
        <h2>Medium Buttons (Default)</h2>
        <ButtonGroup>
          <Button>Button with text</Button>
          <Button icon={<PlusIcon />}>Button with icon</Button>
          <Button variant="outlined">Button</Button>
          <Button variant="outlined" icon={<PlusIcon />}>
            Button
          </Button>
          <Button variant="filledPrimary">Button</Button>
          <Button variant="filledPrimary" icon={<PlusIcon />}>
            Button
          </Button>
          <Button variant="outlinedPrimary">Button</Button>
          <Button variant="outlinedPrimary" icon={<PlusIcon />}>
            Button
          </Button>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>Large Buttons</h2>
        <ButtonGroup>
          <Button size="large">Button with very very long text</Button>
          <Button size="large" icon={<PlusIcon />}>
            Button with icon
          </Button>
          <Button size="large" variant="outlined">
            Button
          </Button>
          <Button size="large" variant="outlined" icon={<PlusIcon />}>
            Button
          </Button>
          <Button size="large" variant="filledPrimary">
            Button
          </Button>
          <Button size="large" variant="filledPrimary" icon={<PlusIcon />}>
            Button
          </Button>
          <Button size="large" variant="outlinedPrimary">
            Button
          </Button>
          <Button size="large" variant="outlinedPrimary" icon={<PlusIcon />}>
            Button
          </Button>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>Disabled State</h2>
        <ButtonGroup>
          <Button disabled>Button</Button>
          <Button variant="outlined" disabled>
            Button
          </Button>
          <Button variant="filledPrimary" disabled>
            Button
          </Button>
          <Button variant="outlinedPrimary" disabled>
            Button
          </Button>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>Round Icon Buttons</h2>
        <ButtonGroup>
          <IconButtonRound size="small" icon={<PlusIcon />} />
          <IconButtonRound
            size="small"
            variant="outlined"
            icon={<PlusIcon />}
          />
          <IconButtonRound
            size="small"
            variant="filledPrimary"
            icon={<PlusIcon />}
          />
          <IconButtonRound
            size="small"
            variant="outlinedPrimary"
            icon={<PlusIcon />}
          />

          <IconButtonRound icon={<PlusIcon />} />
          <IconButtonRound variant="outlined" icon={<PlusIcon />} />
          <IconButtonRound variant="filledPrimary" icon={<PlusIcon />} />
          <IconButtonRound variant="outlinedPrimary" icon={<PlusIcon />} />

          <IconButtonRound size="large" icon={<PlusIcon />} />
          <IconButtonRound
            size="large"
            variant="outlined"
            icon={<PlusIcon />}
          />
          <IconButtonRound
            size="large"
            variant="filledPrimary"
            icon={<PlusIcon />}
          />
          <IconButtonRound
            size="large"
            variant="outlinedPrimary"
            icon={<PlusIcon />}
          />

          <IconButtonRound disabled icon={<PlusIcon />} />
          <IconButtonRound variant="outlined" disabled icon={<PlusIcon />} />
          <IconButtonRound
            variant="filledPrimary"
            disabled
            icon={<PlusIcon />}
          />
          <IconButtonRound
            variant="outlinedPrimary"
            disabled
            icon={<PlusIcon />}
          />
        </ButtonGroup>
        <ButtonGroup>
          <IconButtonRound
            variant="outlinedPrimary"
            icon={
              <PlusIcon
                style={{ width: '60px', height: '60px', color: 'red' }}
              />
            }
          />
        </ButtonGroup>
      </Section>
    </Container>
  )
}

const Container = styled.div`
  padding: 32px;
  color: var(--white);

  h2,
  h3 {
    margin-bottom: 24px;
  }
`

const Section = styled.section`
  margin-bottom: 48px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`

const DropdownWrapper = styled.div`
  width: 200px;
`

const Separator = styled.h1`
  margin: 60px 0 30px 0;
`
