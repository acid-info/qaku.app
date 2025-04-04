import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { defaultPollSettings, pollSettingsAtom } from '@/../atoms/settings'
import { PollFloatingPanelCreate } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { PollCreate } from '@/containers/PollCreate/PollCreate'
import { SidebarContainer } from '@/containers/Sidebar'
import { useAtom } from 'jotai'

export const PollPageCreate: React.FC = () => {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [pollSettings, setPollSettings] = useAtom(pollSettingsAtom)

  return (
    <DefaultLayoutContainer
      useAlternativeGap
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        isTitleOnly: true,
        title: pollSettings.title || defaultPollSettings.title,
        showSettingsButton: true,
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
    </DefaultLayoutContainer>
  )
}
