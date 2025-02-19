import { QnaLiveFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { QnaLiveSidebar } from '@/components/Sidebar/QnaLiveSidebar'
import { QnaLive } from '@/containers/QnaLive/QnaLive'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { QnaProgressStatus } from '@/types/navbar.types'
import { useAtom } from 'jotai'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'

export default function Page() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )

  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      showFooter={false}
      useAlternativeGap
      sidebar={<QnaLiveSidebar />}
      navProps={{
        mode: 'qna',
        isTitleOnly: false,
        status: QnaProgressStatus.InProgress,
        title: 'Live Q&A Session',
        date: new Date().toISOString(),
        count: 0,
        id: '123456',
        onSettingsClick: () => setIsSettingsPanelOpen(true),
      }}
    >
      {page}
      <QnaLiveFloatingPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
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
