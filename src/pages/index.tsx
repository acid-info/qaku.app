import { SEO } from '@/components/SEO'
import { LandingPage } from '@/containers/LandingPage'
import { LandingPageLayout } from '@/layouts/LandingPageLayout'

export default function Page() {
  return (
    <>
      <SEO />
      <LandingPage />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <LandingPageLayout>{page}</LandingPageLayout>
}
