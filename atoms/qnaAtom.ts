import { mockQnAs } from '@/data/mockQnas'
import { QnAFilterTypeEnum, QnAType } from '@/types/qna.types'
import { atom } from 'jotai'

export const qnasRecordAtom = atom<Record<number, QnAType>>(
  mockQnAs.reduce((acc, qna) => {
    acc[qna.id] = qna
    return acc
  }, {} as Record<number, QnAType>),
)

export const qnaIdsAtom = atom<number[]>((get) =>
  Object.keys(get(qnasRecordAtom)).map((id) => parseInt(id)),
)

export const qnaFilterAtom = atom<QnAFilterTypeEnum>(QnAFilterTypeEnum.All)

export const filteredQnAIdsAtom = atom<number[]>((get) => {
  const qnasRecord = get(qnasRecordAtom)
  const filter = get(qnaFilterAtom)
  const qnaIds = get(qnaIdsAtom)

  if (filter === QnAFilterTypeEnum.All) {
    return qnaIds
  }

  const isActive = filter === QnAFilterTypeEnum.Active
  return qnaIds.filter((id) => qnasRecord[id].isActive === isActive)
})

export const qnaStatsAtom = atom((get) => {
  const qnasRecord = get(qnasRecordAtom)
  const qnaIds = get(qnaIdsAtom)

  const activeCount = qnaIds.filter((id) => qnasRecord[id].isActive).length

  return {
    total: qnaIds.length,
    active: activeCount,
    past: qnaIds.length - activeCount,
  }
})

export const getQnaByIdAtom = (id: number) =>
  atom((get) => get(qnasRecordAtom)[id])
