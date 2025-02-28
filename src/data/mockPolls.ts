import { PollType } from '@/types/qna.types'

export const mockPolls: PollType[] = [
  {
    id: 501,
    title: 'Data Fetching Preference',
    question: 'What is your preferred method for data fetching in React?',
    description:
      'Choose the library or approach you find most effective for handling API calls in React applications',
    qnaId: 1,
    optionsIds: [1001, 1002, 1003, 1004],
    optionsCount: [12, 8, 15, 5],
    hasCorrectAnswers: false,
    hasMultipleOptionsSelect: false,
    isResultVisible: true,
    activeUntil: new Date('2025-03-14T12:00:00Z'),
    isActive: true,
  },
  {
    id: 502,
    title: 'API Validation Approach',
    question: 'How do you validate API responses in your applications?',
    description:
      'Select the approach you find most reliable for ensuring type safety in your API interactions',
    qnaId: 1,
    optionsIds: [1005, 1006, 1007],
    optionsCount: [20, 7, 3],
    hasCorrectAnswers: false,
    hasMultipleOptionsSelect: false,
    isResultVisible: true,
    activeUntil: new Date('2025-03-20T16:00:00Z'),
    isActive: true,
  },
  {
    id: 503,
    title: 'CSS in React',
    question: 'What is your preferred styling solution for React applications?',
    description:
      'Select the CSS approach you find most effective for building React UIs',
    qnaId: 2,
    optionsIds: [1008, 1009, 1010, 1011],
    optionsCount: [15, 12, 10, 18],
    hasCorrectAnswers: false,
    hasMultipleOptionsSelect: false,
    isResultVisible: true,
    isActive: false,
  },
]
