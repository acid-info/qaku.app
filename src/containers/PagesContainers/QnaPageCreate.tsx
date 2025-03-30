import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { QnaCreate } from '@/containers/QnaCreate/QnaCreate'
import { SidebarContainer } from '@/containers/Sidebar'
import { NavbarModeEnum } from '@/types/navbar.types'
import { useState } from 'react'

export const QnaPageCreate: React.FC = () => {
  const [isSchedulePanelOpen, setIsSchedulePanelOpen] = useState(false)
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false)

  return (
    <DefaultLayoutContainer
      useAlternativeGap
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: true,
        title: 'New Qaku',
        showScheduleQnaButton: true,
        onScheduleQnaClick: () => setIsSchedulePanelOpen(true),
        showSettingsButton: true,
        onSettingsClick: () => setIsSettingsPanelOpen(true),
      }}
    >
      <SEO />
      <QnaCreate
        isSchedulePanelOpen={isSchedulePanelOpen}
        setIsSchedulePanelOpen={setIsSchedulePanelOpen}
        isSettingsPanelOpen={isSettingsPanelOpen}
        setIsSettingsPanelOpen={setIsSettingsPanelOpen}
      />
    </DefaultLayoutContainer>
  )
}
