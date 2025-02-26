import { mockQnAs } from '@/data/qna'
import { QnA, QnAFilter } from '@/types/qna.types'
import { atom } from 'jotai'

export const qnasAtom = atom<QnA[]>(mockQnAs)
export const qnaFilterAtom = atom<QnAFilter>('all')

export const activeItemIdAtom = atom<string | undefined>(undefined)

export const expandedQnAIdsAtom = atom<Set<string>>(new Set<string>())

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
