import { SEO } from '@/components/SEO'
import { QnaCreated } from '@/containers/QnaCreated/QnaCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'

export default function Page() {
  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
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
      <QnaCreated />
    </>,
  )
}

Page.getLayout = (page: React.ReactNode) => page
