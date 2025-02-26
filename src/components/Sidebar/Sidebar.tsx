import { PollInterface, QnAFilterTypeEnum } from '@/types/qna.types'
import styled from '@emotion/styled'
import { useAtom, useAtomValue } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import {
  activeItemIdAtom,
  expandedQnAIdsAtom,
  filteredQnAsAtom,
  qnaFilterAtom,
  qnaStatsAtom,
} from '../../../atoms/qnaAtom'
import { Button } from '../Button'
import { PlusIcon } from '../Icons/PlusIcon'
import { QnAWidget } from '../QnAWidget'
import { SearchAndFilter } from '../SearchAndFilter'
import { SettingsButton } from '../SettingsButton'
import { Row } from '../StyledComponents'
import { Tile } from '../Tile'

export const Sidebar: React.FC = () => {
  const router = useRouter()
  const [filter, setFilter] = useAtom(qnaFilterAtom)
  const [activeItemId, setActiveItemId] = useAtom(activeItemIdAtom)
  const [expandedQnAIds, setExpandedQnAIds] = useAtom(expandedQnAIdsAtom)

  const filteredQnAs = useAtomValue(filteredQnAsAtom)
  const stats = useAtomValue(qnaStatsAtom)

  // Auto-expand QnA when it or its poll becomes active
  useEffect(() => {
    if (!activeItemId) return

    const qnaToExpand = filteredQnAs.find(
      (qna) =>
        qna.id === activeItemId ||
        qna.polls.some((p: PollInterface) => p.id === activeItemId),
    )

    if (qnaToExpand) {
      setExpandedQnAIds((prev) => {
        const next = new Set(prev)
        next.add(qnaToExpand.id)
        return next
      })
    }
  }, [activeItemId, filteredQnAs, setExpandedQnAIds])

  const handleQnAClick = (qnaId: string) => {
    setActiveItemId(qnaId)
    const qna = filteredQnAs.find((q) => q.id === qnaId)
    if (qna?.isLive) {
      router.push('/qna/live')
    } else {
      router.push(`/qna/created/${qnaId}`)
    }
  }

  const handlePollClick = (pollId: string) => {
    setActiveItemId(pollId)
    const qna = filteredQnAs.find((q) =>
      q.polls.some((p: PollInterface) => p.id === pollId),
    )
    const poll = qna?.polls.find((p: PollInterface) => p.id === pollId)

    if (poll?.isLive) {
      router.push('/poll/live')
    } else {
      router.push(`/poll/created/${pollId}`)
    }
  }

  const handleHeaderClick = (qnaId: string) => {
    setExpandedQnAIds((prev) => {
      const next = new Set(prev)
      if (next.has(qnaId)) {
        next.delete(qnaId)
      } else {
        next.add(qnaId)
      }
      return next
    })
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Your Q&As</Title>
        <Row gap={8}>
          <SettingsButton />
          <Link href="/qna/create">
            <Button variant="filledPrimary" icon={<PlusIcon />}>
              Create
            </Button>
          </Link>
        </Row>
      </TitleContainer>
      <SidebarContent>
        <Tile
          items={[
            {
              label: 'All',
              data: stats.all,
              size: 'large',
              isActive: filter === QnAFilterTypeEnum.All,
              onClick: () => setFilter(QnAFilterTypeEnum.All),
            },
            {
              label: 'Active',
              data: stats.active,
              size: 'large',
              isActive: filter === QnAFilterTypeEnum.Active,
              onClick: () => setFilter(QnAFilterTypeEnum.Active),
            },
          ]}
        />
        <SearchAndFilter
          options={[
            { label: 'Recent', value: 'recent' },
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ]}
          value="recent"
          searchPlaceholder="Search items..."
          filterPlaceholder="Filter by status"
          filterWidth="93px"
          onSearch={() => {}}
          onFilterChange={() => {}}
        />
        <QnaWidgetContainer>
          {filteredQnAs.map((qna) => (
            <QnAWidget
              key={qna.id}
              qnaData={qna}
              pollsData={qna.polls}
              activeItemId={activeItemId}
              isExpanded={expandedQnAIds.has(qna.id)}
              onHeaderClick={() => handleHeaderClick(qna.id)}
              onQnAClick={handleQnAClick}
              onPollClick={handlePollClick}
              isLive={qna.isLive}
            />
          ))}
        </QnaWidgetContainer>
      </SidebarContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Title = styled.h2`
  color: var(--white);
`

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  min-height: 0;
`

const QnaWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
