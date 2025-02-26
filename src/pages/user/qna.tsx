import { SEO } from '@/components/SEO'
import { QnAContainer } from '@/containers/User/QnAContainer'
import UserLayout from '@/layouts/DefaultLayout/User.layout'
import { NavbarModeEnum } from '@/types/navbar.types'

export default function Page() {
  return (
    <>
      <SEO />
      <QnAContainer />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <UserLayout mode={NavbarModeEnum.Qna}>{page}</UserLayout>
}
