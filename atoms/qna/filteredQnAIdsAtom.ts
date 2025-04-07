import { QnAFilterTypeEnum } from '@/types/qna.types'
import { atom } from 'jotai'
import { qnaFilterAtom } from './qnaFilterAtom'
import { qnaIdsAtom } from './qnaIdsAtom'
import { qnasRecordAtom } from './qnasRecordAtom'

export const filteredQnAIdsAtom = atom<string[]>((get) => {
  const qnasRecord = get(qnasRecordAtom)
  const filter = get(qnaFilterAtom)
  const qnaIds = get(qnaIdsAtom)

  if (filter === QnAFilterTypeEnum.All) {
    return qnaIds
  }

  const isActive = filter === QnAFilterTypeEnum.Active
  return qnaIds.filter((id) => qnasRecord[id]?.isActive === isActive)
})
