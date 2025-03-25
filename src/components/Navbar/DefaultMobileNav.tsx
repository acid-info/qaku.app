import { breakpoints } from '@/configs/ui.configs'
import { HOME } from '@/data/routes'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconButtonRound } from '../IconButtonRound'
import { CloseIcon } from '../Icons/CloseIcon'
import { HamburgerIcon } from '../Icons/HamburgerIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { QakuLogo } from '../Icons/QakuLogo'
import { SettingsButton } from '../SettingsButton'
import WalletConnect from './WalletConnect'

type Props = {
  sidebar?: React.ReactNode
  onClickLogo?: () => void
  onClickPlus?: () => void
}

const DefaultMobileNav = ({
  sidebar,
  onClickLogo,
  onClickPlus,
  ...props
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const router = useRouter()

  const onClickLogoDefault = () => {
    router.push(HOME)
  }

  const handleLogoClick = onClickLogo || onClickLogoDefault

  const handleSideBar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <Container {...props}>
      <IconButtonRound
        onClick={handleSideBar}
        variant="filled"
        icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
      />
      <QakuLogo onClick={handleLogoClick} width={30} height={30} />
      <IconButtonRound
        onClick={onClickPlus}
        variant="filledPrimary"
        icon={<PlusIcon />}
      />
      {isSidebarOpen && (
        <MobileSidebar>
          {sidebar}
          <BottomItems>
            <WalletConnect />
            <SettingsButton />
          </BottomItems>
        </MobileSidebar>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
  padding: 8px;

  @media (min-width: ${breakpoints.sm + 1}px) {
    display: none;
  }
`

const MobileSidebar = styled.div`
  --top-margin: 64px;
  --default-margin: 16px;
  --mobile-sidebar-z-index: 1000;

  position: fixed;

  top: var(--top-margin);
  left: var(--default-margin);
  bottom: var(--default-margin);

  width: calc(100% - 2 * var(--default-margin));
  height: calc(100% - var(--top-margin) - var(--default-margin));

  z-index: var(--mobile-sidebar-z-index);
  padding: 16px;

  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid var(--gray);
  background: var(--black);
`

const BottomItems = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  gap: 8px;
`

export default DefaultMobileNav
