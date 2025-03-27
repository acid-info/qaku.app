import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'

const MobileBottomPanel = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  --mobile-bottom-panel-z-index: 2;

  position: fixed;
  z-index: var(--mobile-bottom-panel-z-index);
  bottom: 0;
  width: 100%;
  flex-direction: column;
  padding: 16px;
  gap: 24px;

  border: 1px solid var(--gray);
  border-radius: 8px;
  background: var(--gray-ultradark);

  @media (min-width: ${breakpoints.sm + 1}px) {
    display: none;
  }
`

export default MobileBottomPanel
