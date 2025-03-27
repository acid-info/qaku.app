import { SEO } from '@/components/SEO'
import { QnaPageCreate } from '@/containers/PagesContainers/QnaPageCreate'

export default function Page() {
  return (
    <>
      <SEO />
      <QnaPageCreate />
    </>
  )
}

Page.getLayout = (page: React.ReactNode) => page
