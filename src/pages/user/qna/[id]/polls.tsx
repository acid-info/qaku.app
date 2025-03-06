import { PollsPageUser } from '@/containers/PagesContainers/PollsPageUser'

export default function Page() {
  return <PollsPageUser />
}

Page.getLayout = (page: React.ReactNode) => page
