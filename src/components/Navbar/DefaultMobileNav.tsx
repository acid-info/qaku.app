import { breakpoints } from '@/configs/ui.configs'
import { HOME, QnA } from '@/data/routes'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '../../../hooks'
import { IconButtonRound } from '../IconButtonRound'
import { CloseIcon } from '../Icons/CloseIcon'
import { HamburgerIcon } from '../Icons/HamburgerIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { QakuLogo } from '../Icons/QakuLogo'
import { SettingsButton } from '../SettingsButton'
import { Row } from '../StyledComponents'
import WalletConnect from './WalletConnect'

type Props = {
  sidebar?: React.ReactNode
  onClickPlus?: () => void
  navProps?: {
    title?: string
  }
}

const DefaultMobileNav = ({ sidebar, onClickPlus, ...props }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const router = useRouter()

  const sidebarRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(sidebarRef, () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  })

  const onClickPlusDefault = () => {
    router.push(QnA.CREATE)
  }

  const handlePlusClick = onClickPlus || onClickPlusDefault

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
      <Link href={HOME}>
        <Row gap={8}>
          <QakuLogo width={30} height={30} />
          {props?.navProps?.title && <h3>{props.navProps.title}</h3>}
        </Row>
      </Link>
      <IconButtonRound
        onClick={handlePlusClick}
        variant="filledPrimary"
        icon={<PlusIcon />}
      />
      {isSidebarOpen && (
        <MobileSidebar ref={sidebarRef}>
          {sidebar}
          <BottomItems>
            <WalletConnect />
            <div onClick={handleSideBar}>
              <SettingsButton />
            </div>
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
  margin: 8px 8px 0 8px;
  padding: 8px;

  svg {
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.sm + 1}px) {
    display: none;
  }
`

const MobileSidebar = styled.div`
  --top-margin: 64px;
  --default-margin: 16px;
  --mobile-sidebar-z-index: 5;

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
