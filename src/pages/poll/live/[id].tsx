import { PollPageLive } from '@/containers/PagesContainers'

export default function Page() {
  return <PollPageLive />
}

Page.getLayout = (page: React.ReactNode) => page
