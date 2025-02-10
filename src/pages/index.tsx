import { SEO } from '@/components/SEO'
import HomaPage from '@/containers/HomePage/HomePage'
import { HomeLayout } from '@/layouts/HomeLayout'

export default function HomePage() {
  return (
    <>
      <SEO />
      <HomaPage />
    </>
  )
}

HomePage.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}
