import { pollIdsByQnaIdAtom } from '@/../atoms/poll'
import { getQnaByIdAtom, qnasRecordAtom } from '@/../atoms/qna'
import { useQnaPollsSubscriptions } from '@/../hooks/useQnaPollsSubscriptions'
import { SEO } from '@/components/SEO'
import { PollsUser } from '@/containers/PollsUser'
import { UserLayoutContainer } from '@/containers/UserLayout'
import { NOT_FOUND } from '@/data/routes'
import { NavbarModeEnum } from '@/types/navbar.types'
import { loadAndGetQna } from '@/utils/api.utils'
import { handleUserModeChange } from '@/utils/navbar.utils'
import styled from '@emotion/styled'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useQnaQuestionsAnswersSubscriptions } from '../../../hooks'
import { useQaku } from '../../../hooks/useQaku'

const EmptyState = () => (
  <NoContentMessage>
    <span>There are no polls yet.</span>
  </NoContentMessage>
)

export const PollsPageUser: React.FC = () => {
  const router = useRouter()
  const setQnasRecord = useSetAtom(qnasRecordAtom)
  const id = String(router.query.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isDataFetched, setIsDataFetched] = useState(false)
  const { connected } = useQaku()

  const qnaAtom = useMemo(() => {
    if (!id || !connected) return atom(null)
    return getQnaByIdAtom(id)
  }, [id, connected])

  useQnaPollsSubscriptions(id)
  useQnaQuestionsAnswersSubscriptions(id)

  const pollIdsAtom = useMemo(() => pollIdsByQnaIdAtom(id), [id])
  const pollIds = useAtomValue(pollIdsAtom)
  const qna = useAtomValue(qnaAtom)

  useEffect(() => {
    if (!router.isReady || !connected) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        await loadAndGetQna({ qnaId: id, setQnasRecord })
        //setIsDataFetched(true)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router.isReady, id, setQnasRecord, connected])

  useEffect(() => {
    if (!router.isReady || id == null) return
    if (isDataFetched && !isLoading && !qna) {
      router.push(NOT_FOUND)
    }
  }, [router, id, qna, isLoading, isDataFetched])

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
      {<PollsUser qna={qna} qnaId={id} pollIds={pollIds} />}
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
