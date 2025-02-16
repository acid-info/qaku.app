import styled from '@emotion/styled'

export type ProfileIconProps = {
  character: string
  variant?: 'black' | 'gray'
}

export const ProfileIcon = ({
  character,
  variant = 'black',
}: ProfileIconProps) => {
  return (
    <Container variant={variant}>{character.charAt(0).toUpperCase()}</Container>
  )
}

const Container = styled.div<{ variant: 'black' | 'gray' }>`
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  background-color: ${({ variant }) =>
    variant === 'black' ? 'var(--black)' : 'var(--gray-darker)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`
