import { PollFloatingPanel } from '@/components/FloatingPanel'
import { SEO } from '@/components/SEO'
import { Sidebar } from '@/components/Sidebar'
import { PollCreate } from '@/containers/PollCreate/PollCreate'
import { DefaultLayout } from '@/layouts/DefaultLayout'
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
      sidebar={<Sidebar />}
      navProps={{
        isTitleOnly: true,
        title: 'New Poll',
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
      <PollCreate />
    </>,
  )
}

Page.getLayout = (page: React.ReactNode) => page
