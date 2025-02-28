import { qnaSettingsAtom } from '@/../atoms/settings'
import { QnaFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { QnaLive } from '@/containers/QnaLive/QnaLive'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'

export default function Page() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [qnaSettings, setQnaSettings] = useAtom(qnaSettingsAtom)
  const router = useRouter()

  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      showFooter={false}
      useAlternativeGap
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.InProgress,
        title: qnaSettings.title || 'Live Q&A Session',
        date: new Date().toISOString(),
        count: 0,
        id: '123456',
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: () => router.push('/poll/create'),
      }}
    >
      {page}
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

  return getLayout(
    <>
      <SEO />
      <QnaLive />
    </>,
  )
}

Page.getLayout = (page: React.ReactNode) => page
