import styled from '@emotion/styled'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { Dropdown } from '@/components/Dropdown'
import { IconButtonRound } from '@/components/IconButtonRound'
import { ChatBubbleOutlineIcon } from '@/components/Icons/ChatBubbleOutlineIcon'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import DefaultNav, { ProgressStatus } from '@/components/Navbar/DefaultNav'
import UserNav from '@/components/Navbar/UserNav'
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
      <Section style={{ maxWidth: 1400 }}>
        <h2>User Nav</h2>
        <div>
          <UserNav
            mode="qna"
            title="Town Hall 2025 - New Positions, Updates, And Plans"
            count={3}
            id="3212345"
          />
        </div>
        <br />
        <br />
        <h2>Default Nav</h2>
        <div>
          <DefaultNav
            mode="qna"
            titleOnly={true}
            title="Polls"
            date={'2023-12-25T15:00:00.000Z'}
            count={3}
            id="3212345"
          />
          <DefaultNav
            mode="qna"
            title="Town Hall 2025 - New Positions, Updates, And Plans"
            date={'2023-12-25T15:00:00.000Z'}
            count={1236}
            id="3212345"
            status={ProgressStatus.BeforeStart}
          />
          <DefaultNav
            mode="qna"
            title="Town Hall 2025 - New Positions, Updates, And Plans"
            date={'2023-12-25T15:00:00.000Z'}
            count={1236}
            id="3212345"
            status={ProgressStatus.InProgress}
          />
          <DefaultNav
            mode="qna"
            title="Town Hall 2025"
            date={'2023-12-25T15:00:00.000Z'}
            count={1236}
            id="3212345"
            status={ProgressStatus.Ended}
          />
          <br />
          <br />
          <DefaultNav
            mode="polls"
            titleOnly={true}
            title="New Poll"
            date={'2023-12-25T15:00:00.000Z'}
            count={3}
            id="3212345"
          />
          <DefaultNav
            mode="polls"
            title="Town Hall 2025 - New Positions, Updates, And Plans"
            date={'2023-12-25T15:00:00.000Z'}
            count={1236}
            id="3212345"
            status={ProgressStatus.BeforeStart}
          />
          <DefaultNav
            mode="polls"
            title="Town Hall 2025 - New Positions, Updates, And Plans"
            date={'2023-12-25T15:00:00.000Z'}
            count={1236}
            id="3212345"
            status={ProgressStatus.InProgress}
          />
          <DefaultNav
            mode="polls"
            title="Town Hall 2025"
            date={'2023-12-25T15:00:00.000Z'}
            count={1236}
            id="3212345"
            status={ProgressStatus.Ended}
          />
        </div>
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
