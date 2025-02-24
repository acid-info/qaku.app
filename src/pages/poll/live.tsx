import { pollSettingsAtom } from '@/../atoms/settings'
import { PollFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { Sidebar } from '@/components/Sidebar'
import { PollLive } from '@/containers/PollLive/PollLive'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { QnaProgressStatus } from '@/types/navbar.types'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'

export default function Page() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [pollSettings, setPollSettings] = useAtom(pollSettingsAtom)
  const router = useRouter()

  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      useAlternativeGap
      showFooter={false}
      sidebar={<Sidebar />}
      navProps={{
        mode: 'polls',
        isTitleOnly: false,
        status: QnaProgressStatus.InProgress,
        title: pollSettings.title || 'Live Q&A Session',
        date: new Date().toISOString(),
        count: 0,
        id: '123456',
        onSettingsClick: () => setIsSettingsPanelOpen(true),
        onAddPollClick: () => router.push('/poll/create'),
      }}
    >
      {page}
      <PollFloatingPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        initialValues={pollSettings}
        onSave={(values) => {
          setPollSettings(values)
          setIsSettingsPanelOpen(false)
        }}
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
