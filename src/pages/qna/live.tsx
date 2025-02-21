import { QnaFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { Sidebar } from '@/components/Sidebar'
import { QnaLive } from '@/containers/QnaLive/QnaLive'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { QnaProgressStatus } from '@/types/navbar.types'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'

export default function Page() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const router = useRouter()

  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      showFooter={false}
      useAlternativeGap
      sidebar={<Sidebar />}
      navProps={{
        mode: 'qna',
        isTitleOnly: false,
        status: QnaProgressStatus.InProgress,
        title: 'Live Q&A Session',
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
