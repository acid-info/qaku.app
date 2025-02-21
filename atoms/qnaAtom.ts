import { QnA, mockQnAs } from '@/data/qna'
import { atom } from 'jotai'

export type QnAFilter = 'all' | 'active'

export const qnasAtom = atom<QnA[]>(mockQnAs)
export const qnaFilterAtom = atom<QnAFilter>('all')

export const activeQnAIdAtom = atom<string | undefined>(undefined)
export const activePollIdAtom = atom<string | undefined>(undefined)

export const filteredQnAsAtom = atom((get) => {
  const qnas = get(qnasAtom)
  const filter = get(qnaFilterAtom)

  if (filter === 'all') {
    return qnas
  }

  return qnas.filter((qna) => qna.isLive)
})

export const qnaStatsAtom = atom((get) => {
  const qnas = get(qnasAtom)
  return {
    all: qnas.length,
    active: qnas.filter((qna) => qna.isLive).length,
  }
})
