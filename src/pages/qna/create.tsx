import { SEO } from '@/components/SEO'
import { QnaCreate } from '@/containers/QnaCreate/QnaCreate'
import { SidebarContainer } from '@/containers/Sidebar'
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
      sidebar={<SidebarContainer />}
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
