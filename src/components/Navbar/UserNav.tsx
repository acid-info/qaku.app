import { QakuLogo } from '@/components/Icons/QakuLogo'
import { breakpoints } from '@/configs/ui.configs'
import { LANDING, QnA } from '@/data/routes'
import { NavbarModeEnum, UserNavbarProps } from '@/types/navbar.types'
import { numberWithCommas } from '@/utils/general.utils'
import { handleUserViewShare } from '@/utils/navbar.utils'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Button } from '../Button'
import { LinkIcon } from '../Icons/LinkIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { Tab } from '../Tab'
import WalletConnect from './WalletConnect'

export const renderUnit = (mode: NavbarModeEnum, count: number) => {
  return count < 1
    ? mode === NavbarModeEnum.Qna
      ? 'question'
      : 'poll'
    : mode === NavbarModeEnum.Qna
    ? 'questions'
    : 'polls'
}

const UserNav = ({ mode, title, count, id, onModeChange }: UserNavbarProps) => {
  return (
    <Container>
      <Left>
        <Link href={LANDING}>
          <QakuLogo width={40} height={40} />
        </Link>
        <Info>
          <Title>{title}</Title>
          <CountAndId>
            <p>
              {numberWithCommas(count)} {renderUnit(mode, count)}
            </p>
            <span>#{id}</span>
          </CountAndId>
        </Info>
      </Left>
      <TabWrapper>
        <Tab
          options={[
            { id: 'qna', label: 'Q&A' },
            { id: 'polls', label: 'Polls' },
          ]}
          activeId={mode}
          onChange={(id) => onModeChange?.(id as NavbarModeEnum)}
          itemWidth="100px"
        />
      </TabWrapper>
      <Nav>
        <WalletConnect connectWalletButtonLabel="Connect for identity">
          <Link href={QnA.CREATE} target="_blank" rel="noopener noreferrer">
            <Button icon={<PlusIcon />}>Create Q&A</Button>
          </Link>
          <Button icon={<LinkIcon />} onClick={handleUserViewShare}>
            Share
          </Button>
        </WalletConnect>
      </Nav>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  width: 100%;
  padding: 16px;
  gap: 16px;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: ${breakpoints.sm}px) {
    display: none;
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const Info = styled.div`
  margin-left: 16px;
  display: flex;
  max-width: 439px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const CountAndId = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);

  span {
    opacity: 0.5;
  }
`

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  font-size: var(--body1-font-size);
  line-height: var(--body1-line-height);

  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  word-break: break-all;
`

const Nav = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`

export default UserNav
