import { CreateQnA } from '@/components/Dashboard/CreateQnA'
import { SEO } from '@/components/SEO'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function CreateQnAPage() {
  return (
    <>
      <SEO />
      <CreateQnA />
    </>
  )
}

CreateQnAPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DefaultLayout>{page}</DefaultLayout>
}
