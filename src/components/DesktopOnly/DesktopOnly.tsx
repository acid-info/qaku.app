import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'

type Props = {
  children: React.ReactNode
}

const DesktopOnly = ({ children }: Props) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: none;

  @media (min-width: ${breakpoints.sm + 1}px) {
    display: contents;
  }
`

export default DesktopOnly
