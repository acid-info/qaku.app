import { numberWithCommas } from '@/utils/general.utils'
import styled from '@emotion/styled'
import { Button } from '../Button'
import { QakuLogo } from '../Icons/QakuLogo'
import WalletConnect from './WalletConnect'

interface Props {
  mode: 'qna' | 'polls'
  title: string
  count: number
  id: string
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

const UserNav = ({ mode, title, count, id }: Props) => {
  return (
    <Container>
      <Left>
        <QakuLogo width={40} height={40} />
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
      <ToggleContainer>
        <Button variant={mode === 'qna' ? 'filledPrimary' : 'filled'}>
          Q&A
        </Button>
        <Button variant={mode === 'polls' ? 'filledPrimary' : 'filled'}>
          Polls
        </Button>
      </ToggleContainer>
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

const ToggleContainer = styled.div`
  display: flex;

  button {
    width: 100px;
    border-radius: 40px;
  }
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

export default UserNav
