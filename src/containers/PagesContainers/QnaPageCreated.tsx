import { SEO } from '@/components/SEO'
import { QnaCreated } from '@/containers/QnaCreated/QnaCreated'
import { SidebarContainer } from '@/containers/Sidebar'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NavbarModeEnum, QnaProgressStatusEnum } from '@/types/navbar.types'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { getQnaByIdAtom } from '../../../atoms/qnaAtom'

export const QnaPageCreated: React.FC = () => {
  const router = useRouter()

  const qnaId = useMemo(() => {
    const id = router.query.id
    return typeof id === 'string' ? parseInt(id, 10) : null
  }, [router.query.id])

  const qnaAtom = useMemo(() => {
    return qnaId !== null ? getQnaByIdAtom(qnaId) : atom(null)
  }, [qnaId])

  const qna = useAtomValue(qnaAtom)

  if (!router.isReady || qnaId === null || !qna) {
    return null
  }

  return (
    <DefaultLayout
      showFooter={false}
      sidebar={<SidebarContainer />}
      navProps={{
        mode: NavbarModeEnum.Qna,
        isTitleOnly: false,
        status: QnaProgressStatusEnum.Ended,
        title: qna.title,
        date: qna.startDate.toISOString(),
        count: qna.questionsIds.length,
        id: qnaId.toString(),
      }}
    >
      <SEO />
      <QnaCreated qnaId={qnaId} />
    </DefaultLayout>
  )
}
