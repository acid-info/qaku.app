import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

// TODO-vaclav example of a spinner component
interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  message?: string
  fullScreen?: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'var(--white)',
  message,
  fullScreen = false,
}) => {
  return (
    <SpinnerContainer $fullScreen={fullScreen}>
      <SpinnerWrapper>
        <SpinnerCircle $size={size} $color={color} />
        {message && <SpinnerMessage $color={color}>{message}</SpinnerMessage>}
      </SpinnerWrapper>
    </SpinnerContainer>
  )
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerContainer = styled.div<{ $fullScreen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $fullScreen }) =>
    $fullScreen
      ? `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
      `
      : ''}
`

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const SpinnerCircle = styled.div<{ $size: string; $color: string }>`
  width: ${({ $size }) =>
    $size === 'small' ? '24px' : $size === 'medium' ? '40px' : '64px'};
  height: ${({ $size }) =>
    $size === 'small' ? '24px' : $size === 'medium' ? '40px' : '64px'};
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const SpinnerMessage = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: var(--body1-font-size);
  line-height: var(--body1-line-height);
`
