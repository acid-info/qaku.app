import styled from '@emotion/styled'

export type ProfileIconProps = {
  character: string
}

export const ProfileIcon = ({ character }: ProfileIconProps) => {
  return <Container>{character.charAt(0).toUpperCase()}</Container>
}

const Container = styled.div`
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  background-color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
`
