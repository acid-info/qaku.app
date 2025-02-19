import { SEO } from '@/components/SEO'
import { HomeSidebar } from '@/components/Sidebar/HomeSidebar'
import { SettingsPage } from '@/containers/Home/SettingsPage'
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
    <HomeLayout title="Settings" sidebar={<HomeSidebar />}>
      {page}
    </HomeLayout>
  )
}
