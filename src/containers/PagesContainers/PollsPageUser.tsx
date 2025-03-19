import { SEO } from '@/components/SEO'
import { PollsUser } from '@/containers/PollsUser'
import { UserLayoutContainer } from '@/containers/UserLayout'
import { NavbarModeEnum } from '@/types/navbar.types'
import { QnAType } from '@/types/qna.types'
import { loadAndGetQna } from '@/utils/api.utils'
import { handleUserModeChange } from '@/utils/navbar.utils'
import styled from '@emotion/styled'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { pollIdsByQnaIdAtom } from '../../../atoms/poll'
import { qnasRecordAtom } from '../../../atoms/qna'
import { useQnaPollsSubscriptions } from '../../../hooks/useQnaPollsSubscriptions'

const EmptyState = () => (
  <NoContentMessage>
    <span>There are no polls yet.</span>
  </NoContentMessage>
)

export const PollsPageUser: React.FC = () => {
  const router = useRouter()
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const [qna, setQna] = useState<QnAType | null>(null)

  const qnaId = useMemo(() => {
    const id = router.query.id
    return parseInt(String(id), 10)
  }, [router.query.id])

  // Fetch QnA data to get the title
  useEffect(() => {
    const loadQnaData = async () => {
      const qnaData = await loadAndGetQna({ qnaId, setQnasRecord })
      setQna(qnaData)
    }
    loadQnaData()
  }, [qnaId, setQnasRecord])

  useQnaPollsSubscriptions(qnaId)

  const pollIdsAtom = useMemo(() => pollIdsByQnaIdAtom(qnaId), [qnaId])
  const pollIds = useAtomValue(pollIdsAtom)

  if (!qnaId || !qna) {
    return null
  }

  return (
    <UserLayoutContainer
      onModeChange={(mode) =>
        handleUserModeChange({
          newMode: mode,
          qnaId: String(qnaId),
          router,
        })
      }
      navProps={{
        mode: NavbarModeEnum.Polls,
        title: qna.title,
        count: pollIds.length,
        id: String(qnaId),
      }}
    >
      <SEO />
      <PollsUser pollIds={pollIds} />
      {pollIds.length === 0 && <EmptyState />}
    </UserLayoutContainer>
  )
}

const NoContentMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
