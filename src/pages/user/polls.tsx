import { SEO } from '@/components/SEO'
import { PollsContainer } from '@/containers/User/PollsContainer'
import UserLayout from '@/layouts/DefaultLayout/User.layout'

export default function Page() {
  return (
    <>
      <SEO />
      <PollsContainer />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <UserLayout mode="polls">{page}</UserLayout>
}
