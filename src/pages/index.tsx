import { SEO } from '@/components/SEO'
import { LandingPage } from '@/containers/LandingPage'
import { LandingPageLayoutContainer } from '@/containers/LandingPageLayout'

export default function Page() {
  return (
    <>
      <SEO />
      <LandingPage />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <LandingPageLayoutContainer>{page}</LandingPageLayoutContainer>
}
