import styled from '@emotion/styled'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { Collapsible } from '@/components/Collapsible'
import { CollapsibleToggle } from '@/components/CollapsibleToggle'
import { Dropdown } from '@/components/Dropdown'
import { IconButtonRound } from '@/components/IconButtonRound'
import { ChatBubbleOutlineIcon } from '@/components/Icons/ChatBubbleOutlineIcon'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { MessageForm } from '@/components/MessageForm'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { Search } from '@/components/Search'
import { ToggleButton } from '@/components/ToggleButton'
import { TogglePill } from '@/components/TogglePill'

type DemoSectionProps = {
  title: string
  children: React.ReactNode
}

const DemoSection: React.FC<DemoSectionProps> = ({ title, children }) => (
  <Section>
    <h2>{title}</h2>
    <ButtonGroup>{children}</ButtonGroup>
  </Section>
)

const CollapsibleDemo = () => (
  <DemoSection title="Collapsible">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '500px',
      }}
    >
      <Collapsible title="Add description">
        <textarea
          style={{ height: '100px' }}
          placeholder="Type something here.."
        />
      </Collapsible>
      <Collapsible title="Review password">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              color: 'var(--white)',
              opacity: 0.7,
              fontSize: 'var(--body2-font-size)',
              lineHeight: 'var(--body2-line-height)',
            }}
          >
            Generated automatically for encrypted Q&As
          </span>
          <PasswordGenerator />
        </div>
      </Collapsible>
      <Collapsible title="Default expanded" defaultExpanded>
        <div>This content is visible by default.</div>
      </Collapsible>
    </div>
  </DemoSection>
)

const CollapsibleToggleDemo = () => (
  <DemoSection title="Collapsible Toggle">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '500px',
      }}
    >
      <CollapsibleToggle
        title="Poll description"
        description="Add a description visible to participants"
      >
        <textarea
          style={{ height: '100px' }}
          placeholder="Type something here.."
        />
      </CollapsibleToggle>
      <CollapsibleToggle title="Toggle without description">
        <span>Some text content.</span>
      </CollapsibleToggle>
      <CollapsibleToggle
        title="Toggle with Form"
        description="Contains an interactive form element"
        defaultChecked
      >
        <MessageForm
          isAuthorized
          onSubmit={({ message, isAnonymous, resetForm }) => {
            console.log('Message:', message, 'isAnonymous:', isAnonymous)
            resetForm()
          }}
        />
      </CollapsibleToggle>
    </div>
  </DemoSection>
)

const MessageFormDemo = () => (
  <DemoSection title="Message Form">
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
  </DemoSection>
)

const DropdownDemo = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | number>()
  const [selectedTheme, setSelectedTheme] = useState<string | number>()

  const options = {
    language: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
      { label: 'Italian', value: 'it' },
    ],
    theme: [
      { label: 'System', value: 'system' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
  }

  return (
    <DemoSection title="Dropdowns">
      <DropdownWrapper>
        <h3>Filled</h3>
        <Dropdown
          options={options.language}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          placeholder="Select Language"
        />
      </DropdownWrapper>
      <DropdownWrapper style={{ width: '130px' }}>
        <h3>Outlined</h3>
        <Dropdown
          options={options.theme}
          value={selectedTheme}
          onChange={setSelectedTheme}
          variant="outlined"
          placeholder="Select Theme"
        />
      </DropdownWrapper>
    </DemoSection>
  )
}

const ButtonDemo = () => {
  const buttonVariants = [
    'default',
    'outlined',
    'filledPrimary',
    'outlinedPrimary',
  ] as const

  const renderButtonSet = (size?: 'large') =>
    buttonVariants.map((variant) => (
      <React.Fragment key={`${size}-${variant}`}>
        <Button
          size={size}
          variant={variant === 'default' ? undefined : variant}
        >
          Button
        </Button>
        <Button
          size={size}
          variant={variant === 'default' ? undefined : variant}
          icon={<PlusIcon />}
        >
          Button
        </Button>
      </React.Fragment>
    ))

  return (
    <>
      <DemoSection title="Buttons">
        {renderButtonSet()}
        {renderButtonSet('large')}
        {buttonVariants.map((variant) => (
          <Button
            key={variant}
            variant={variant === 'default' ? undefined : variant}
            disabled
          >
            Button
          </Button>
        ))}
      </DemoSection>
    </>
  )
}

const IconButtonDemo = () => {
  const variants = [
    'default',
    'outlined',
    'filledPrimary',
    'outlinedPrimary',
  ] as const
  const sizes = ['small', 'medium', 'large'] as const

  return (
    <DemoSection title="Round Icon Buttons">
      {sizes.map((size) => (
        <React.Fragment key={size}>
          {variants.map((variant) => (
            <IconButtonRound
              key={`${size}-${variant}`}
              size={size === 'medium' ? undefined : size}
              variant={variant === 'default' ? undefined : variant}
              icon={<PlusIcon />}
            />
          ))}
        </React.Fragment>
      ))}
      {variants.map((variant) => (
        <IconButtonRound
          key={`disabled-${variant}`}
          variant={variant === 'default' ? undefined : variant}
          disabled
          icon={<PlusIcon />}
        />
      ))}
      <IconButtonRound
        variant="outlinedPrimary"
        icon={
          <PlusIcon style={{ width: '60px', height: '60px', color: 'red' }} />
        }
      />
    </DemoSection>
  )
}

const ToggleDemo = () => {
  const [toggleState, setToggleState] = useState(false)
  const [pillStates, setPillStates] = useState([
    { count: 42, active: false },
    { count: 24, active: true },
    { count: 1000, active: false },
  ])

  const handlePillClick = (index: number) => {
    setPillStates((prev) =>
      prev.map((state, i) =>
        i === index
          ? {
              count: state.active ? state.count - 1 : state.count + 1,
              active: !state.active,
            }
          : state,
      ),
    )
  }

  return (
    <>
      <DemoSection title="Toggle Button">
        <ToggleButton isOn={toggleState} onChange={setToggleState} />
      </DemoSection>
      <DemoSection title="Toggle Pills">
        {pillStates.map((state, index) => (
          <TogglePill
            key={index}
            count={state.count}
            isActive={state.active}
            icon={index > 0 ? <ChatBubbleOutlineIcon /> : undefined}
            activeIcon={index > 0 ? <ChatBubbleOutlineIcon /> : undefined}
            onClick={() => handlePillClick(index)}
          />
        ))}
      </DemoSection>
    </>
  )
}

export const TestContainer: React.FC = () => (
  <Container>
    <Separator style={{ marginTop: '0' }}>Patterns</Separator>
    <CollapsibleDemo />
    <CollapsibleToggleDemo />
    <MessageFormDemo />

    <Separator>Components</Separator>
    <DropdownDemo />
    <DemoSection title="Search">
      <Search onSearch={(value) => console.log('Search:', value)} />
      <Search
        label="Find Something"
        placeholder="Enter keywords..."
        onSearch={(value) => console.log('Search:', value)}
      />
    </DemoSection>
    <ToggleDemo />
    <ButtonDemo />
    <IconButtonDemo />
  </Container>
)

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
