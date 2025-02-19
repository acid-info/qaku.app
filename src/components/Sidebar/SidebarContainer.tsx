import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { QakuLogo } from '../Icons/QakuLogo'

export const SidebarContainer = ({ children }: PropsWithChildren) => {
  return (
    <SidebarWrapper>
      <Link href="/">
        <QakuLogo width={40} height={40} />
      </Link>
      {children}
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.aside`
  display: flex;
  width: var(--sidebar-width);
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-start;
  padding: 16px;

  a {
    width: fit-content;
  }

  @media (max-width: ${breakpoints.sm}px) {
    display: none;
  }
`
