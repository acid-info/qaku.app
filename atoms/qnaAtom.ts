import { mockQnAs } from '@/data/qna'
import { QnAFilterTypeEnum, QnAInterface } from '@/types/qna.types'
import { atom } from 'jotai'

export const qnasAtom = atom<QnAInterface[]>(mockQnAs)
export const qnaFilterAtom = atom<QnAFilterTypeEnum>(QnAFilterTypeEnum.All)

export const activeItemIdAtom = atom<string | undefined>(undefined)

export const expandedQnAIdsAtom = atom<Set<string>>(new Set<string>())

export const filteredQnAsAtom = atom((get) => {
  const qnas = get(qnasAtom)
  const filter = get(qnaFilterAtom)

  if (filter === QnAFilterTypeEnum.All) {
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
