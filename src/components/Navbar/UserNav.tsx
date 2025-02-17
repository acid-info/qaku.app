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
          <p>{title}</p>
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
      <WalletConnect />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-start;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Info = styled.div`
  margin-left: 16px;
  display: flex;
  max-width: 439px;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
`

export default UserNav
