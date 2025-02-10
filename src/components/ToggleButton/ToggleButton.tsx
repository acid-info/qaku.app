import styled from '@emotion/styled'

export interface ToggleButtonProps {
  isOn: boolean
  onChange?: (isOn: boolean) => void
  className?: string
}

export const ToggleButton = ({
  isOn,
  onChange,
  className,
}: ToggleButtonProps) => {
  const handleClick = () => {
    onChange?.(!isOn)
  }

  return (
    <StyledButton
      type="button"
      onClick={handleClick}
      $isOn={isOn}
      className={className}
    >
      <LeftRect $isOn={isOn} />
      <RightRect $isOn={isOn} />
    </StyledButton>
  )
}

const StyledButton = styled.button<{ $isOn: boolean }>`
  width: 32px;
  height: 16px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  display: flex;
`

const LeftRect = styled.div<{ $isOn: boolean }>`
  width: 16px;
  height: 16px;
  background-color: ${({ $isOn }) =>
    $isOn ? 'var(--gray-dark)' : 'var(--gray-lighter)'};
`

const RightRect = styled.div<{ $isOn: boolean }>`
  width: 16px;
  height: 16px;
  background-color: ${({ $isOn }) =>
    $isOn ? 'var(--yellow)' : 'var(--gray-dark)'};
`
