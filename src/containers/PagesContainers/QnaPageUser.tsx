import { getQnaByIdAtom, qnasRecordAtom } from '@/../atoms/qna'
import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsAnswersSubscriptions } from '@/../hooks/useQnaQuestionsAnswersSubscriptions'
import { SEO } from '@/components/SEO'
import { UserLayoutContainer } from '@/containers/UserLayout'
import { NOT_FOUND } from '@/data/routes'
import { NavbarModeEnum } from '@/types/navbar.types'
import { loadAndGetQna } from '@/utils/api.utils'
import { handleUserModeChange } from '@/utils/navbar.utils'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useQaku } from '../../../hooks/useQaku'
import { QnaUser } from '../QnaUser/QnaUser'

export const QnaPageUser: React.FC = () => {
  const router = useRouter()
  const id = String(router.query.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const { userName } = useAtomValue(walletStateAtom)
  const setQnasRecord = useSetAtom(qnasRecordAtom)

  const { connected } = useQaku()

  const qnaAtom = useMemo(() => {
    if (!id || !connected) return atom(null)
    return getQnaByIdAtom(id)
  }, [id, connected])

  const qna = useAtomValue(qnaAtom)
  useQnaQuestionsAnswersSubscriptions(id)

  useEffect(() => {
    if (!router.isReady || !connected) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        await loadAndGetQna({ qnaId: id, setQnasRecord })
        //setIsDataFetched(true)
        setIsLoading(false)
      } catch (_) {
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
        mode: NavbarModeEnum.Qna,
        title: qna?.title,
        count: qna?.questionsIds.length,
        id: id.toString(),
      }}
    >
      <SEO />
      <QnaUser qna={qna} qnaId={id} userId={userName ?? ''} />
    </UserLayoutContainer>
  )
}
