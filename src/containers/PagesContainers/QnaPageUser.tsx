import { qnasRecordAtom } from '@/../atoms/qna'
import { walletStateAtom } from '@/../atoms/wallet'
import { useQnaQuestionsAnswersSubscriptions } from '@/../hooks/useQnaQuestionsAnswersSubscriptions'
import { SEO } from '@/components/SEO'
import { UserLayoutContainer } from '@/containers/UserLayout'
import { NOT_FOUND } from '@/data/routes'
import { NavbarModeEnum } from '@/types/navbar.types'
import { QnAType } from '@/types/qna.types'
import { loadAndGetQna } from '@/utils/api.utils'
import { handleUserModeChange } from '@/utils/navbar.utils'
import { checkValidQnA } from '@/utils/qna.utils'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { QnaUser } from '../QnaUser/QnaUser'

export const QnaPageUser: React.FC = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  const { userName } = useAtomValue(walletStateAtom)
  const setQnasRecord = useSetAtom(qnasRecordAtom)

  // Todo might want to use jotai atom here. It's hard fetch qna and then use a derived atom here.
  const [qna, setQna] = useState<QnAType | null>(null)

  useEffect(() => {
    const loadQnaData = async () => {
      const qna = await loadAndGetQna({ qnaId: id, setQnasRecord })
      setQna(qna)
    }
    loadQnaData()
  }, [id, setQnasRecord])

  useQnaQuestionsAnswersSubscriptions(id)

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
        mode: NavbarModeEnum.Qna,
        title: qna?.title,
        count: qna?.questionsIds.length,
        id: id.toString(),
      }}
    >
      <SEO />
      <QnaUser qnaId={id} userId={userName ?? ''} />
    </UserLayoutContainer>
  )
}
