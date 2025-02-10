import styled from '@emotion/styled'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { IconButtonRound } from '@/components/IconButtonRound'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { ToggleButton } from '@/components/ToggleButton'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const HomeContainer: React.FC<HomePageProps> = ({
  children,
  ...props
}) => {
  const [toggleState, setToggleState] = useState(false)

  return (
    <Container {...props}>
      <Section>
        <h2>Toggle Button</h2>
        <ToggleButton isOn={toggleState} onChange={setToggleState} />
      </Section>

      <Section>
        <h2>Medium Buttons (Default)</h2>
        <ButtonGroup>
          <Button>Button</Button>
          <Button icon={<PlusIcon />}>Button</Button>
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
          <Button size="large">Button</Button>
          <Button size="large" icon={<PlusIcon />}>
            Button
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

  h2 {
    color: var(--white);
    margin-bottom: 24px;
    font-size: 24px;
  }
`

const Section = styled.section`
  margin-bottom: 48px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
`
