import { SEO } from '@/components/SEO'
import { QnaCreateSidebar } from '@/components/Sidebar/QnaCreateSidebar'
import { QnaCreate } from '@/containers/QnaCreate'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function Page() {
  return (
    <>
      <SEO />
      <QnaCreate />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <DefaultLayout
      showFooter={false}
      sidebar={<QnaCreateSidebar />}
      navTitle="New Qaku"
    >
      {page}
    </DefaultLayout>
  )
}
