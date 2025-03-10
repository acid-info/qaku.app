import { atom } from 'jotai'
import { qnaIdsAtom } from './qnaIdsAtom'
import { qnasRecordAtom } from './qnasRecordAtom'

export const qnaStatsAtom = atom((get) => {
  const qnasRecord = get(qnasRecordAtom)
  const qnaIds = get(qnaIdsAtom)

  const activeCount = qnaIds.filter((id) => qnasRecord[id]?.isActive).length

  return {
    total: qnaIds.length,
    active: activeCount,
    past: qnaIds.length - activeCount,
  }
})
