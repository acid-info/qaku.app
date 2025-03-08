import { pollSettingsAtom } from '@/../atoms/settings'
import { PollFloatingPanelCreate } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { PollCreate } from '@/containers/PollCreate/PollCreate'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { useAtom } from 'jotai'
import { isSettingsPanelOpenAtom } from '../../../atoms/navbar/isSettingsPanelOpenAtom'

export const PollPageCreate: React.FC = () => {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [pollSettings, setPollSettings] = useAtom(pollSettingsAtom)

  return (
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
      <SEO />
      <PollCreate />
      <PollFloatingPanelCreate
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
}
