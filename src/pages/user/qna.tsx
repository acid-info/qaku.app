import { SEO } from '@/components/SEO'
import UserLayout from '@/layouts/DefaultLayout/User.layout'

export default function Page() {
  return (
    <>
      <SEO />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <UserLayout>{page}</UserLayout>
}
