import { SEO } from '@/components/SEO'
import { QnaLiveSidebar } from '@/components/Sidebar/QnaLiveSidebar'
import { QnaCreated } from '@/containers/QnaCreated/QnaCreated'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { QnaProgressStatus } from '@/types/navbar.types'

export default function Page() {
  const getLayout = (page: React.ReactNode) => (
    <DefaultLayout
      showFooter={false}
      sidebar={<QnaLiveSidebar />}
      navProps={{
        mode: 'qna',
        isTitleOnly: false,
        status: QnaProgressStatus.Ended,
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
