import { breakpoints } from '@/configs/ui.configs'
import { ModalContainer } from '@/containers/ModalContainer'
import {
  DefaultNavbarProps,
  NavbarModeEnum,
  QnaProgressStatusEnum,
} from '@/types/navbar.types'
import { numberWithCommas } from '@/utils/general.utils'
import {
  ConfirmActionType,
  formatDate,
  getNavModalProps,
} from '@/utils/navbar.utils'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Button } from '../Button'
import { ButtonColored } from '../ButtonColored/ButtonColored'
import { DateRangePill } from '../DateRangePill/DateRangePill'
import { IconButtonRound } from '../IconButtonRound'
import { CalendarIcon } from '../Icons/CalendarIcon/CalendarIcon'
import { DeleteIcon } from '../Icons/DeleteIcon'
import { DotIcon } from '../Icons/DotIcon'
import { LinkIcon } from '../Icons/LinkIcon'
import { PlayArrowIcon } from '../Icons/PlayArrowIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { SettingsIcon } from '../Icons/SettingsIcon'
import { StopIcon } from '../Icons/StopIcon'
import { Pill } from '../Pill'
import { Row } from '../StyledComponents'
import WalletConnect from './WalletConnect'

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
  startDate,
  endDate,
  count,
  id,
  status,
  onSettingsClick,
  onAddPollClick,
  onShareClick,
  onStartClick,
  onEndClick,
  onDeleteClick,
  onScheduleQnaClick,
  showShareButton = false,
  showSettingsButton = false,
  showScheduleQnaButton = false,
}: DefaultNavbarProps) => {
  const isBeforeStart = status === QnaProgressStatusEnum.BeforeStart
  const isInProgress = status === QnaProgressStatusEnum.InProgress
  const isEnded = status === QnaProgressStatusEnum.Ended

  const [confirmAction, setConfirmAction] = useState<ConfirmActionType>(null)

  const modalProps = getNavModalProps({
    confirmAction,
    mode,
    onStartClick,
    onEndClick,
    onDeleteClick,
    setConfirmAction,
  })

  return (
    <Container>
      <Left>
        {isTitleOnly ? (
          <h1>{title}</h1>
        ) : (
          <Info>
            <Title>{title}</Title>
            <Details>
              <Pill
                title={mode === NavbarModeEnum.Qna ? 'Q&A' : 'Polls'}
                variant={mode === NavbarModeEnum.Qna ? 'orange' : 'green'}
              />
              <Row gap={8}>
                {isBeforeStart && startDate && endDate ? (
                  <DateRangePill startDate={startDate} endDate={endDate} />
                ) : (
                  <p>{formatDate(startDate)}</p>
                )}
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
          <ButtonColored
            color="var(--yellow)"
            icon={<PlayArrowIcon />}
            onClick={() => setConfirmAction('start')}
          >
            Open {mode === 'qna' ? 'Q&A' : 'Poll'}
          </ButtonColored>
        )}
        {isInProgress && (
          <ButtonColored
            color="var(--red)"
            icon={<StopIcon />}
            onClick={() => setConfirmAction('end')}
          >
            Close {mode === 'qna' ? 'Q&A' : 'Poll'}
          </ButtonColored>
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
          {(isBeforeStart || isEnded) && (
            <IconButtonRound
              icon={<DeleteIcon />}
              onClick={() => setConfirmAction('delete')}
            />
          )}
          {showScheduleQnaButton && (
            <IconButtonRound
              icon={<CalendarIcon />}
              onClick={onScheduleQnaClick}
            />
          )}
          {showSettingsButton && (
            <IconButtonRound
              icon={<SettingsIcon />}
              onClick={onSettingsClick}
            />
          )}
        </Row>
        <Row>
          {showShareButton && (
            <Button icon={<LinkIcon />} onClick={onShareClick}>
              Share
            </Button>
          )}
          <WalletConnect />
        </Row>

        {confirmAction && <ModalContainer {...modalProps} />}
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
