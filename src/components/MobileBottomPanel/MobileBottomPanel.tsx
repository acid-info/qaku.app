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
  left: 0;
  width: 100%;
  flex-direction: column;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  border: 1px solid var(--gray);
  border-radius: 8px;
  background: var(--gray-ultradark);

  @media (min-width: ${breakpoints.sm + 1}px) {
    display: none;
  }

  h3 {
    font-size: var(--body1-font-size);
    line-height: var(--body1-line-height);
  }

  p {
    font-size: var(--label1-font-size);
    line-height: var(--label1-line-height);
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .id {
    opacity: 0.5;
  }
`

export default MobileBottomPanel
