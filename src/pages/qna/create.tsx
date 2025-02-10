import { CreateQnA } from '@/components/Dashboard/CreateQnA'
import { SEO } from '@/components/SEO'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function Page() {
  return (
    <>
      <SEO />
      <CreateQnA />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <DefaultLayout>{page}</DefaultLayout>
}
