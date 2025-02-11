import { SEO } from '@/components/SEO'
import { TestContainer } from '@/containers/Test'

export default function Page() {
  return (
    <>
      <SEO />
      <TestContainer />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <>{page}</>
}
