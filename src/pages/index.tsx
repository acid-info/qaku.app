import { SEO } from '@/components/SEO'
import { HomePage } from '@/containers/HomePage'
import { HomeLayout } from '@/layouts/HomeLayout'

export default function Page() {
  return (
    <>
      <SEO />
      <HomePage />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}
