import { SEO } from '@/components/SEO'
import { SettingsPage } from '@/containers/PagesContainers/SettingsPage'
import { SidebarContainer } from '@/containers/Sidebar'
import { HomeLayout } from '@/layouts/HomeLayout'

export default function Page() {
  return (
    <>
      <SEO />
      <SettingsPage />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <HomeLayout
      title="Settings"
      sidebar={<SidebarContainer />}
      showFooter={false}
    >
      {page}
    </HomeLayout>
  )
}
