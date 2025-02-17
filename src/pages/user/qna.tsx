import { CreateQnA } from '@/components/Dashboard/CreateQnA'
import { SEO } from '@/components/SEO'
import UserLayout from '@/layouts/DefaultLayout/User.layout'

export default function Page() {
  return (
    <>
      <SEO />
      <CreateQnA />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <UserLayout>{page}</UserLayout>
}
