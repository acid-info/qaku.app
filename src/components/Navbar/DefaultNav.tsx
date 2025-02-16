import { numberWithCommas } from '@/utils/general.utils'
import styled from '@emotion/styled'
import { Button } from '../Button'
import { IconButtonRound } from '../IconButtonRound'
import { DeleteIcon } from '../Icons/DeleteIcon'
import { LinkIcon } from '../Icons/LinkIcon'
import { PauseIcon } from '../Icons/PauseIcon'
import { PlayArrowIcon } from '../Icons/PlayArrowIcon'
import { SettingsIcon } from '../Icons/SettingsIcon'
import WalletConnect from './WalletConnect'

export enum ProgressStatus {
  BeforeStart = 'beforeStart',
  InProgress = 'inProgress',
  Ended = 'ended',
}

interface Props {
  mode: 'qna' | 'polls'
  titleOnly?: boolean
  title: string
  date: string
  count: number
  id: string
  status?: ProgressStatus
}

// TODO : handing TODAY, days agp
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const renderUnit = (mode: 'qna' | 'polls', count: number) => {
  return count < 1
    ? mode === 'qna'
      ? 'question'
      : 'vote'
    : mode === 'qna'
    ? 'questions'
    : 'votes'
}

const DefaultNav = ({
  mode,
  titleOnly = false,
  title,
  date,
  count,
  id,
  status,
}: Props) => {
  return (
    <Container>
      <Left>
        {titleOnly ? (
          <h1>{title}</h1>
        ) : (
          <Info>
            <p>{title}</p>
            <Details>
              <Badge $mode={mode}>{mode === 'qna' ? 'Q&A' : 'Polls'}</Badge>
              <Row gap={8}>
                <p>{formatDate(date)}</p>
                <p>·</p>
                <p>
                  {numberWithCommas(count)} {renderUnit(mode, count)}
                </p>
              </Row>
              <span>#{id}</span>
            </Details>
          </Info>
        )}
      </Left>
      <Right>
        <Row>
          {status === ProgressStatus.BeforeStart && (
            <CustomButton
              $color="yellow"
              variant="outlinedPrimary"
              icon={<PlayArrowIcon />}
            >
              Start {mode === 'qna' ? 'Q&A' : 'Poll'}
            </CustomButton>
          )}
          {status === ProgressStatus.InProgress && (
            <CustomButton
              $color="red"
              variant="outlinedPrimary"
              icon={<PauseIcon />}
            >
              Close {mode === 'qna' ? 'Q&A' : 'Poll'}
            </CustomButton>
          )}
        </Row>
        <Row>
          {status === ProgressStatus.BeforeStart ||
          status === ProgressStatus.InProgress ? (
            <IconButtonRound icon={<DeleteIcon />} />
          ) : null}
          <IconButtonRound icon={<SettingsIcon />} />
        </Row>
        <Row>
          <Button icon={<LinkIcon />}>Share</Button>
          <WalletConnect />
        </Row>
      </Right>
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
  display: flex;
  max-width: 439px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const Right = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const Row = styled.div<{ gap?: number }>`
  display: flex;
  gap: ${({ gap }) => gap || 2}px;
  align-items: center;
`

const Details = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);

  span {
    opacity: 0.5;
  }
`

const Badge = styled.div<{ $mode: 'qna' | 'polls' }>`
  display: flex;
  background-color: ${({ $mode }) =>
    $mode === 'qna' ? 'var(--red)' : 'var(--green)'};
  color: var(--black);
  border-radius: 32px;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  text-transform: capitalize;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
`

const CustomButton = styled(Button)<{ $color: 'yellow' | 'red' }>`
  border-color: ${({ $color }) =>
    $color === 'yellow' ? 'var(--yellow)' : 'var(--red)'};

  svg path {
    fill: ${({ $color }) =>
      $color === 'yellow' ? 'var(--yellow)' : 'var(--red)'};
  }

  &:not(:disabled):hover {
    background-color: ${({ $color }) =>
      $color === 'yellow'
        ? 'color-mix(in srgb, var(--yellow) 20%, transparent)'
        : 'color-mix(in srgb, var(--red) 20%, transparent)'};
  }
`

export default DefaultNav
