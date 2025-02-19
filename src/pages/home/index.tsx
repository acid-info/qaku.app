import { CreateNewQaku } from '@/components/Home/CreateNewQaku'
import { SEO } from '@/components/SEO'
import { HomeSidebar } from '@/components/Sidebar/HomeSidebar'
import { HomeLayout } from '@/layouts/HomeLayout'

export default function Page() {
  return (
    <>
      <SEO />
      <CreateNewQaku />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout sidebar={<HomeSidebar />}>{page}</HomeLayout>
}
