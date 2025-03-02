import { PollPageCreated } from '@/containers/PagesContainers'

export default function Page() {
  return <PollPageCreated />
}

Page.getLayout = (page: React.ReactNode) => page
