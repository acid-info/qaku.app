import { type QnAInterface } from '@/types/qna.types'

export const mockQnAs: QnAInterface[] = [
  {
    id: 'qna-1',
    title: 'Community Town Hall Q&A',
    isLive: true,
    polls: [
      { id: 'poll-1-1', title: 'Platform Feature Priority', isLive: true },
    ],
  },
  {
    id: 'qna-2',
    title: 'Product Launch Feedback',
    polls: [
      { id: 'poll-2-1', title: 'UI/UX Rating' },
      { id: 'poll-2-2', title: 'Pricing Model Survey' },
    ],
  },
  {
    id: 'qna-3',
    title: 'Developer Workshop Series',
    polls: [
      { id: 'poll-3-1', title: 'Tech Stack Preferences' },
      { id: 'poll-3-2', title: 'Workshop Topics' },
    ],
  },
]
