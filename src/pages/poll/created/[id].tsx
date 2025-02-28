import { SEO } from '@/components/SEO'

import { PollCreated } from '@/containers/PollCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'

export default function Page() {
  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Polls,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.Ended,
        title: 'Live Q&A Session',
        date: new Date().toISOString(),
        count: 0,
        id: '123456',
      }}
    >
      {page}
    </DefaultLayout>
  )

  return getLayout(
    <>
      <SEO />
      <PollCreated />
    </>,
  )
}

Page.getLayout = (page: React.ReactNode) => page
