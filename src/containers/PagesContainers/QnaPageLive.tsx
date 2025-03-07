import { QnaFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'
import { getQnaByIdAtom } from '../../../atoms/qna'
import { qnaSettingsAtom } from '../../../atoms/settings'
import { userAtom } from '../../../atoms/user'
import { useQnaQuestionsAnswersSubscriptions } from '../../../hooks/useQnaQuestionsAnswersSubscriptions'
import { QnaLive } from '../QnaLive/QnaLive'

export const QnaPageLive: React.FC = () => {
  const router = useRouter()
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [qnaSettings, setQnaSettings] = useAtom(qnaSettingsAtom)
  const user = useAtomValue(userAtom)

  const qnaId = useMemo(() => {
    const id = router.query.id
    return parseInt(String(id), 10)
  }, [router.query.id])

  const qnaAtom = useMemo(() => {
    if (!qnaId) return atom(null)
    return getQnaByIdAtom(qnaId)
  }, [qnaId])

  const qna = useAtomValue(qnaAtom)

  useQnaQuestionsAnswersSubscriptions(qnaId)

  if (!qnaId || !qna) {
    return null
  }

  return (
    <DefaultLayout
      showFooter={false}
      useAlternativeGap
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.InProgress,
        title: qna.title,
        date: qna.startDate.toISOString(),
        count: qna.questionsIds.length,
        id: qnaId.toString(),
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: () => router.push('/poll/create'),
      }}
    >
      <SEO />
      <QnaLive qnaId={qnaId} userId={user.id} />
      <QnaFloatingPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        initialValues={qnaSettings}
        onSave={(values) => {
          setQnaSettings(values)
          setIsSettingsPanelOpen(false)
        }}
      />
    </DefaultLayout>
  )
}
