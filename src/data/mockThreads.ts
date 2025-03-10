import { type ThreadInterface } from '@/types/thread.types'

export const mockThreads: ThreadInterface[] = [
  {
    info: {
      isAnswered: false,
      questionId: 1,
      author: 'Alice',
      timestamp: '2025-02-14T11:48:36.135Z',
      question:
        'What are the key differences between React hooks and class components?',
      responses: [
        {
          id: 101,
          info: {
            author: 'Bob',
            timestamp: '2025-02-15T11:48:36.135Z',
            response:
              'Hooks are more flexible and allow better code reuse. They also eliminate the complexity of lifecycle methods.',
          },
          likes: { count: 12, isLiked: false },
        },
        {
          id: 102,
          info: {
            author: 'Bob',
            timestamp: '2025-02-16T11:48:36.135Z',
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
      isAnswered: false,
      questionId: 2,
      author: 'David',
      timestamp: '2025-02-15T11:48:36.135Z',
      question:
        'How do you handle state management in large React applications? Would you recommend Redux, Context API, or other solutions?',
      responses: [
        {
          id: 103,
          info: {
            author: 'Eva',
            timestamp: '2025-02-16T11:48:36.135Z',
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
      isAnswered: false,
      questionId: 3,
      author: 'Frank',
      timestamp: '2025-02-17T11:48:36.135Z',
      question:
        'What are the best practices for handling API calls in React components? Should we use custom hooks?',
      responses: [
        {
          id: 104,
          info: {
            author: 'Henry',
            timestamp: '2025-02-19T11:48:36.135Z',
            response:
              'Custom hooks are great for reusable API logic. Tools like React Query or SWR can also help with caching and state management.',
          },
          likes: { count: 20, isLiked: false },
        },
        {
          id: 105,
          info: {
            author: 'Henry',
            timestamp: '2025-02-17T11:48:36.135Z',
            response:
              'Absolutely agree with using React Query. It handles loading states, caching, and error handling out of the box.',
          },
          likes: { count: 18, isLiked: true },
        },
        {
          id: 106,
          info: {
            author: 'Henry',
            timestamp: '2025-02-20T11:48:36.135Z',
            response:
              'Absolutely agree with using React Query. It handles loading states, caching, and error handling out of the box.',
          },
          likes: { count: 18, isLiked: true },
        },
        {
          id: 107,
          info: {
            author: 'Anonymous',
            timestamp: '2025-02-15T11:48:36.135Z',
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
      isAnswered: false,
      questionId: 4,
      author: 'Isabel',
      timestamp: '2025-02-12T11:48:36.135Z',
      question:
        'What are your thoughts on using TypeScript with React? Is it worth the additional setup time?',
      responses: [],
    },
    likes: { count: 15, isLiked: false },
  },
  {
    info: {
      isAnswered: false,
      questionId: 5,
      author: 'Jack',
      timestamp: '2025-02-10T11:48:36.135Z',
      question:
        'How do you optimize performance in React applications? Any specific tools or techniques you recommend?',
      responses: [
        {
          id: 108,
          info: {
            author: 'Kelly',
            timestamp: '2025-02-14T11:48:36.135Z',
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
