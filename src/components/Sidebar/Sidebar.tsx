import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { QakuLogo } from '../Icons/QakuLogo'
import { Menu } from './Menu'

const SidebarWrapper = styled.aside`
  display: flex;
  width: var(--sidebar-width);
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-start;
  padding: 16px;
`

export const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <Link href="/">
        <QakuLogo width={40} height={40} />
      </Link>
      <Menu />
    </SidebarWrapper>
  )
}
