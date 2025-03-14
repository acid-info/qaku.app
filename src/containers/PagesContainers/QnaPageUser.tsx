import { SEO } from '@/components/SEO'
import UserLayout from '@/layouts/DefaultLayout/User.layout'
import { NavbarModeEnum } from '@/types/navbar.types'
import { QnAType } from '@/types/qna.types'
import { loadAndGetQna } from '@/utils/api.utils'
import { handleUserModeChange } from '@/utils/navbar.utils'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { qnasRecordAtom } from '../../../atoms/qna'
import { walletStateAtom } from '../../../atoms/wallet'
import { useQnaQuestionsAnswersSubscriptions } from '../../../hooks/useQnaQuestionsAnswersSubscriptions'
import { QnaUser } from '../QnaUser/QnaUser'

export const QnaPageUser: React.FC = () => {
  const router = useRouter()

  const { userName } = useAtomValue(walletStateAtom)
  const setQnasRecord = useSetAtom(qnasRecordAtom)

  // Todo might want to use jotai atom here. It's hard fetch qna and then use a derived atom here.
  const [qna, setQna] = useState<QnAType | null>(null)

  const qnaId = useMemo(() => {
    const id = router.query.id
    return parseInt(String(id), 10)
  }, [router.query.id])

  useEffect(() => {
    const loadQnaData = async () => {
      const qna = await loadAndGetQna({ qnaId, setQnasRecord })
      setQna(qna)
    }
    loadQnaData()
  }, [qnaId, setQnasRecord])

  useQnaQuestionsAnswersSubscriptions(qnaId)

  if (!qnaId || !qna) {
    return null
  }

  return (
    <UserLayout
      onModeChange={(mode) =>
        handleUserModeChange({
          newMode: mode,
          qnaId: String(qnaId),
          router,
        })
      }
      navProps={{
        mode: NavbarModeEnum.Qna,
        title: qna.title,
        count: qna.questionsIds.length,
        id: qnaId.toString(),
      }}
    >
      <SEO />
      <QnaUser qnaId={qnaId} userId={userName ?? ''} />
    </UserLayout>
  )
}
