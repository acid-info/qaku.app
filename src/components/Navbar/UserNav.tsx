import { numberWithCommas } from '@/utils/general.utils'
import styled from '@emotion/styled'
import Link from 'next/link'
import { QakuLogo } from '../Icons/QakuLogo'
import { Tab } from '../Tab'
import WalletConnect from './WalletConnect'

export type NavMode = 'qna' | 'polls'

export type UserNavProps = {
  mode: NavMode
  title: string
  count: number
  id: string
  onModeChange?: (mode: NavMode) => void
}

const renderUnit = (mode: 'qna' | 'polls', count: number) => {
  return count < 1
    ? mode === 'qna'
      ? 'question'
      : 'poll'
    : mode === 'qna'
    ? 'questions'
    : 'polls'
}

const UserNav = ({ mode, title, count, id, onModeChange }: UserNavProps) => {
  return (
    <Container>
      <Left>
        <Link href="/">
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
          onChange={(id) => onModeChange?.(id as NavMode)}
          itemWidth="100px"
        />
      </TabWrapper>
      <Nav>
        <WalletConnect />
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
