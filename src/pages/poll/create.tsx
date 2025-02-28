import { pollSettingsAtom } from '@/../atoms/settings'
import { PollFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { PollCreate } from '@/containers/PollCreate/PollCreate'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { useAtom } from 'jotai'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'

export default function Page() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [pollSettings, setPollSettings] = useAtom(pollSettingsAtom)

  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      useAlternativeGap
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        isTitleOnly: true,
        title: pollSettings.title || 'New Poll',
        onSettingsClick: () => setIsSettingsPanelOpen(true),
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
      <PollCreate />
    </>,
  )
}

Page.getLayout = (page: React.ReactNode) => page
