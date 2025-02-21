import { SEO } from '@/components/SEO'
import { Sidebar } from '@/components/Sidebar'
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
    <HomeLayout title="Settings" sidebar={<Sidebar />} showFooter={false}>
      {page}
    </HomeLayout>
  )
}
