import { pollIdsByQnaIdAtom } from '@/../atoms/poll'
import { qnasRecordAtom } from '@/../atoms/qna'
import { useQnaPollsSubscriptions } from '@/../hooks/useQnaPollsSubscriptions'
import { SEO } from '@/components/SEO'
import { PollsUser } from '@/containers/PollsUser'
import { UserLayoutContainer } from '@/containers/UserLayout'
import { NOT_FOUND } from '@/data/routes'
import { NavbarModeEnum } from '@/types/navbar.types'
import { QnAType } from '@/types/qna.types'
import { loadAndGetQna } from '@/utils/api.utils'
import { handleUserModeChange } from '@/utils/navbar.utils'
import { checkValidQnA } from '@/utils/qna.utils'
import styled from '@emotion/styled'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

const EmptyState = () => (
  <NoContentMessage>
    <span>There are no polls yet.</span>
  </NoContentMessage>
)

export const PollsPageUser: React.FC = () => {
  const router = useRouter()
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const id = Number(router.query.id)

  const [qna, setQna] = useState<QnAType | null>(null)

  // Fetch QnA data to get the title
  useEffect(() => {
    const loadQnaData = async () => {
      const qnaData = await loadAndGetQna({ qnaId: id, setQnasRecord })
      setQna(qnaData)
    }
    loadQnaData()
  }, [id, setQnasRecord])

  useQnaPollsSubscriptions(id)

  const pollIdsAtom = useMemo(() => pollIdsByQnaIdAtom(id), [id])
  const pollIds = useAtomValue(pollIdsAtom)

  useEffect(() => {
    if (router.isReady && id != null) {
      if (qna == null) {
        const isValidId = checkValidQnA(id)

        if (!isValidId) {
          router.push(NOT_FOUND)
        }
      }
    }
  }, [id, qna, router])

  return (
    <UserLayoutContainer
      onModeChange={(mode) =>
        handleUserModeChange({
          newMode: mode,
          qnaId: String(id),
          router,
        })
      }
      navProps={{
        mode: NavbarModeEnum.Polls,
        title: qna?.title,
        count: pollIds.length,
        id: String(id),
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
