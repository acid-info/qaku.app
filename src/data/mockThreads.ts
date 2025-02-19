import { LikeInfo, ThreadInfo } from '@/components/Thread/ThreadItemHeader'

export interface ThreadResponse {
  info: {
    author: string
    timestamp: string
    response: string
  }
  likes: LikeInfo
}

export interface Thread {
  info: ThreadInfo & {
    question: string
    responses: ThreadResponse[]
  }
  likes: LikeInfo
}

export const mockThreads: Thread[] = [
  {
    info: {
      author: 'Alice',
      timestamp: '15:32',
      question:
        'What are the key differences between React hooks and class components?',
      responses: [
        {
          info: {
            author: 'Bob',
            timestamp: '15:45',
            response:
              'Hooks are more flexible and allow better code reuse. They also eliminate the complexity of lifecycle methods.',
          },
          likes: { count: 12, isLiked: false },
        },
        {
          info: {
            author: 'Charlie',
            timestamp: '16:00',
            response:
              'Class components can be easier to understand for developers coming from OOP backgrounds. However, hooks simplify state management and side effects.',
          },
          likes: { count: 8, isLiked: true },
        },
      ],
    },
    likes: { count: 42, isLiked: true },
  },
  {
    info: {
      author: 'David',
      timestamp: '15:40',
      question:
        'How do you handle state management in large React applications? Would you recommend Redux, Context API, or other solutions?',
      responses: [
        {
          info: {
            author: 'Eva',
            timestamp: '15:50',
            response:
              'For smaller apps, Context API is sufficient. For larger applications with complex state, Redux or Zustand provide better dev tools and performance.',
          },
          likes: { count: 15, isLiked: true },
        },
      ],
    },
    likes: { count: 28, isLiked: false },
  },
  {
    info: {
      author: 'Frank',
      timestamp: '15:55',
      question:
        'What are the best practices for handling API calls in React components? Should we use custom hooks?',
      responses: [
        {
          info: {
            author: 'Grace',
            timestamp: '16:05',
            response:
              'Custom hooks are great for reusable API logic. Tools like React Query or SWR can also help with caching and state management.',
          },
          likes: { count: 20, isLiked: false },
        },
        {
          info: {
            author: 'Henry',
            timestamp: '16:10',
            response:
              'Absolutely agree with using React Query. It handles loading states, caching, and error handling out of the box.',
          },
          likes: { count: 18, isLiked: true },
        },
        {
          info: {
            author: 'Anonymous',
            timestamp: '16:15',
            response:
              'We use custom hooks with Axios interceptors for consistent error handling across our application.',
          },
          likes: { count: 7, isLiked: false },
        },
      ],
    },
    likes: { count: 35, isLiked: true },
  },
  {
    info: {
      author: 'Isabel',
      timestamp: '16:20',
      question:
        'What are your thoughts on using TypeScript with React? Is it worth the additional setup time?',
      responses: [],
    },
    likes: { count: 15, isLiked: false },
  },
  {
    info: {
      author: 'Jack',
      timestamp: '16:25',
      question:
        'How do you optimize performance in React applications? Any specific tools or techniques you recommend?',
      responses: [
        {
          info: {
            author: 'Kelly',
            timestamp: '16:30',
            response:
              'Use React.memo for expensive components, virtualization for long lists, and lazy loading for routes. Chrome DevTools Performance tab is essential for profiling.',
          },
          likes: { count: 25, isLiked: true },
        },
      ],
    },
    likes: { count: 30, isLiked: false },
  },
]
