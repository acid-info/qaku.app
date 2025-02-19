import { SEO } from '@/components/SEO'
import { QnAContainer } from '@/containers/User/QnAContainer'
import UserLayout from '@/layouts/DefaultLayout/User.layout'

export default function Page() {
  return (
    <>
      <SEO />
      <QnAContainer />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <UserLayout>{page}</UserLayout>
}
