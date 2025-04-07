import { QnA } from '@/data/routes'
import { NavbarModeEnum } from '@/types/navbar.types'
import { numberWithCommas } from '@/utils/general.utils'
import { handleShare } from '@/utils/navbar.utils'
import Link from 'next/link'
import { Button } from '../Button'
import { LinkIcon } from '../Icons/LinkIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { renderUnit } from '../Navbar/UserNav'
import { MobileBottomPanel } from './MobileBottomPanel'

type Props = {
  mode: NavbarModeEnum
  title: string
  count: number
  id: string
  children?: React.ReactNode
}

export const UserNavMobileBottomPanel = ({
  mode,
  title,
  count,
  id,
  children,
}: Props) => {
  return (
    <MobileBottomPanel>
      <div>
        <h3>{title}</h3>
        <div className="row">
          <p>
            {numberWithCommas(count)} {renderUnit(mode, count)}
          </p>
          <p className="id">#{id}</p>
        </div>
      </div>
      {children}
      <div className="row">
        <Button>Connect for Identity</Button>
        <Button
          icon={<LinkIcon />}
          onClick={() =>
            handleShare({
              qnaId: id,
              mode: NavbarModeEnum.Qna,
            })
          }
        >
          Share
        </Button>
        <Link href={QnA.CREATE}>
          <Button icon={<PlusIcon />}>Create Q&A</Button>
        </Link>
      </div>
    </MobileBottomPanel>
  )
}
