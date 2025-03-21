import {
  DefaultNavbarProps,
  NavbarModeEnum,
  QnaProgressStatusEnum,
} from '@/types/navbar.types'
import { numberWithCommas } from '@/utils/general.utils'
import styled from '@emotion/styled'
import { Button } from '../Button'
import { IconButtonRound } from '../IconButtonRound'
import { DeleteIcon } from '../Icons/DeleteIcon'
import { DotIcon } from '../Icons/DotIcon'
import { LinkIcon } from '../Icons/LinkIcon'
import { PauseIcon } from '../Icons/PauseIcon'
import { PlayArrowIcon } from '../Icons/PlayArrowIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { SettingsIcon } from '../Icons/SettingsIcon'
import { Row } from '../StyledComponents'
import WalletConnect from './WalletConnect'

// TODO : handing TODAY, days agp
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const renderUnit = (mode: NavbarModeEnum, count: number) => {
  return count < 1
    ? mode === NavbarModeEnum.Qna
      ? 'question'
      : 'vote'
    : mode === NavbarModeEnum.Qna
    ? 'questions'
    : 'votes'
}

const DefaultNav = ({
  mode,
  isTitleOnly = false,
  title,
  date,
  count,
  id,
  status,
  onSettingsClick,
  onAddPollClick,
  showShareButton = false,
  onShareClick,
}: DefaultNavbarProps) => {
  const isBeforeStart = status === QnaProgressStatusEnum.BeforeStart
  const isInProgress = status === QnaProgressStatusEnum.InProgress

  return (
    <Container>
      <Left>
        {isTitleOnly ? (
          <h1>{title}</h1>
        ) : (
          <Info>
            <Title>{title}</Title>
            <Details>
              <Badge $mode={mode}>{mode === 'qna' ? 'Q&A' : 'Polls'}</Badge>
              <Row gap={8}>
                <p>{formatDate(date)}</p>
                <DotIcon color="var(--white)" />
                <p>
                  {numberWithCommas(count)} {renderUnit(mode, count)}
                </p>
              </Row>
              <span>#{id}</span>
            </Details>
          </Info>
        )}
      </Left>
      <Navbar>
        {isBeforeStart && (
          <CustomButton
            $color="yellow"
            variant="outlinedPrimary"
            icon={<PlayArrowIcon />}
          >
            Start {mode === 'qna' ? 'Q&A' : 'Poll'}
          </CustomButton>
        )}
        {isInProgress && (
          <CustomButton
            $color="red"
            variant="outlinedPrimary"
            icon={<PauseIcon />}
          >
            Close {mode === 'qna' ? 'Q&A' : 'Poll'}
          </CustomButton>
        )}
        {isInProgress && (
          <Button
            variant="outlined"
            icon={<PlusIcon />}
            onClick={onAddPollClick}
          >
            Add Poll
          </Button>
        )}
        <Row gap={0}>
          {isBeforeStart || isInProgress ? (
            <IconButtonRound icon={<DeleteIcon />} />
          ) : null}
          <IconButtonRound icon={<SettingsIcon />} onClick={onSettingsClick} />
        </Row>
        <Row>
          {showShareButton && (
            <Button icon={<LinkIcon />} onClick={onShareClick}>
              Share
            </Button>
          )}
          <WalletConnect />
        </Row>
      </Navbar>
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
  display: flex;
  max-width: 439px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const Navbar = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
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

const Badge = styled.div<{ $mode: NavbarModeEnum }>`
  display: flex;
  background-color: ${({ $mode }) =>
    $mode === NavbarModeEnum.Qna ? 'var(--orange)' : 'var(--green)'};
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

export default DefaultNav
