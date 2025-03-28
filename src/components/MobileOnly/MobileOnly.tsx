import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'

type Props = {
  children: React.ReactNode
}

const MobileOnly = ({ children }: Props) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: none;

  @media (max-width: ${breakpoints.sm}px) {
    display: contents;
  }
`

export default MobileOnly
