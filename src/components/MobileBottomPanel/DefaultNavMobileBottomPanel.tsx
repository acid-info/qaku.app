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
import { Button } from '../Button/Button'
import { ButtonColored } from '../ButtonColored/ButtonColored'
import { DateRangePill } from '../DateRangePill/DateRangePill'
import { IconButtonRound } from '../IconButtonRound/IconButtonRound'
import { DeleteIcon } from '../Icons/DeleteIcon'
import { DotIcon } from '../Icons/DotIcon'
import { LinkIcon } from '../Icons/LinkIcon'
import { PlayArrowIcon } from '../Icons/PlayArrowIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { SettingsIcon } from '../Icons/SettingsIcon'
import { StopIcon } from '../Icons/StopIcon'
import { renderUnit } from '../Navbar/UserNav'
import { Pill } from '../Pill'
import { MobileBottomPanel } from './MobileBottomPanel'

type DefaultNavMobileBottomPanelProps = Omit<
  DefaultNavbarProps,
  'isTitleOnly' | 'onScheduleQnaClick' | 'showScheduleQnaButton'
>

export const DefaultNavMobileBottomPanel = ({
  mode,
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
  showShareButton = false,
  showSettingsButton = false,
}: DefaultNavMobileBottomPanelProps) => {
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
    <MobileBottomPanel gap={32}>
      <Top>
        <h3>{title}</h3>
        <Info>
          <Pill
            title={mode === NavbarModeEnum.Qna ? 'Q&A' : 'Polls'}
            variant={mode === NavbarModeEnum.Qna ? 'orange' : 'green'}
          />
          {isBeforeStart && startDate && endDate ? (
            <DateRangePill startDate={startDate} endDate={endDate} />
          ) : (
            <p>{formatDate(startDate)}</p>
          )}
          <DotIcon color="var(--white)" />
          <p>
            {numberWithCommas(count)} {renderUnit(mode, count)}
          </p>
          <p className="id">#{id}</p>
        </Info>
      </Top>
      <div className="row">
        {isInProgress && (
          <Button
            variant="outlined"
            icon={<PlusIcon />}
            onClick={onAddPollClick}
          >
            Add Poll
          </Button>
        )}
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
        {(isBeforeStart || isEnded) && (
          <IconButtonRound
            icon={<DeleteIcon />}
            onClick={() => setConfirmAction('delete')}
          />
        )}
        {showSettingsButton && (
          <IconButtonRound icon={<SettingsIcon />} onClick={onSettingsClick} />
        )}
        {showShareButton && (
          <Button icon={<LinkIcon />} onClick={onShareClick}>
            Share
          </Button>
        )}
      </div>

      {confirmAction && <ModalContainer {...modalProps} />}
    </MobileBottomPanel>
  )
}

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Info = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
