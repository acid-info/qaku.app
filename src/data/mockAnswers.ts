import { AnswerType } from '@/types/qna.types'

export const mockAnswers: AnswerType[] = [
  {
    id: 101,
    timestamp: new Date('2025-02-15T12:48:36.135Z'),
    content:
      'Hooks are more flexible and allow better code reuse. They also eliminate the complexity of lifecycle methods.',
    author: 'Bob',
    likesCount: 12,
    likers: ['user7', 'user8'],
    questionId: 1,
    qnaId: 1,
  },
  {
    id: 102,
    timestamp: new Date('2025-02-16T10:48:36.135Z'),
    content:
      'Class components can be easier to understand for developers coming from OOP backgrounds. However, hooks simplify state management and side effects.',
    author: 'Bob',
    likesCount: 8,
    likers: ['user9'],
    questionId: 1,
    qnaId: 1,
  },
  {
    id: 103,
    timestamp: new Date('2025-02-16T11:48:36.135Z'),
    content:
      'For smaller apps, Context API is sufficient. For larger applications with complex state, Redux or Zustand provide better dev tools and performance.',
    author: 'Eva',
    likesCount: 15,
    likers: ['user4', 'user10'],
    questionId: 2,
    qnaId: 1,
  },
  {
    id: 104,
    timestamp: new Date('2025-02-19T13:48:36.135Z'),
    content:
      'Custom hooks are great for reusable API logic. Tools like React Query or SWR can also help with caching and state management.',
    author: 'Henry',
    likesCount: 20,
    likers: ['user11', 'user12'],
    questionId: 3,
    qnaId: 1,
  },
  {
    id: 105,
    timestamp: new Date('2025-02-20T14:48:36.135Z'),
    content:
      'Absolutely agree with using React Query. It handles loading states, caching, and error handling out of the box.',
    author: 'Henry',
    likesCount: 18,
    likers: ['user13', 'user14'],
    questionId: 3,
    qnaId: 1,
  },
]
