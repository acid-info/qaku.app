import { PollPageCreate } from '@/containers/PagesContainers'

export default function Page() {
  return <PollPageCreate />
}

Page.getLayout = (page: React.ReactNode) => page
