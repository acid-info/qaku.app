import { isSettingsPanelOpenAtom } from '@/../atoms/navbar/isSettingsPanelOpenAtom'
import { defaultQnaSettings, qnaSettingsAtom } from '@/../atoms/settings/qna'
import { QnaFloatingPanelCreate } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { QnaCreate } from '@/containers/QnaCreate/QnaCreate'
import { SidebarContainer } from '@/containers/Sidebar'
import { NavbarModeEnum } from '@/types/navbar.types'
import { QnaSettingsInterface } from '@/types/settings.types'
import { useAtom } from 'jotai'
import { useState } from 'react'

export const QnaPageCreate: React.FC = () => {
  const [isSchedulePanelOpen, setIsSchedulePanelOpen] = useState(false)
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useAtom(
    isSettingsPanelOpenAtom,
  )
  const [qnaSettings, setQnaSettings] = useAtom(qnaSettingsAtom)

  const handleSaveQnaSettings = (values: QnaSettingsInterface) => {
    setQnaSettings(values)
    setIsSettingsPanelOpen(false)
  }

  return (
    <DefaultLayoutContainer
      useAlternativeGap
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: true,
        title: qnaSettings.title || defaultQnaSettings.title,
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
      />
      <QnaFloatingPanelCreate
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        initialValues={qnaSettings}
        onSave={handleSaveQnaSettings}
      />
    </DefaultLayoutContainer>
  )
}
