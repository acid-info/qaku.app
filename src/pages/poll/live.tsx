import { PollFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { QnaLiveSidebar } from '@/components/Sidebar/QnaLiveSidebar'
import { PollLive } from '@/containers/PollLive/PollLive'
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
      useAlternativeGap
      showFooter={false}
      sidebar={<QnaLiveSidebar />}
      navProps={{
        mode: 'polls',
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
      <PollFloatingPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
      />
    </DefaultLayout>
  )

  return getLayout(
    <>
      <SEO />
      <PollLive />
    </>,
  )
}

Page.getLayout = (page: React.ReactNode) => page
