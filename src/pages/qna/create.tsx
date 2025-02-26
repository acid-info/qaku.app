import { SEO } from '@/components/SEO'
import { Sidebar } from '@/components/Sidebar'
import { QnaCreate } from '@/containers/QnaCreate/QnaCreate'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum } from '@/types/navbar.types'

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
      useAlternativeGap
      showFooter={false}
      sidebar={<Sidebar />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: true,
        title: 'New Qaku',
      }}
    >
      {page}
    </DefaultLayout>
  )
}
