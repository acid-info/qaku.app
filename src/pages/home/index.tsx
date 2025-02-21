import { CreateNewQaku } from '@/components/Home/CreateNewQaku'
import { SEO } from '@/components/SEO'
import { Sidebar } from '@/components/Sidebar'
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
  return (
    <HomeLayout showFooter={true} sidebar={<Sidebar />}>
      {page}
    </HomeLayout>
  )
}
