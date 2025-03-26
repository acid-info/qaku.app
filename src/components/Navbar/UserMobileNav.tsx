import { breakpoints } from '@/configs/ui.configs'
import { HOME } from '@/data/routes'
import { NavbarModeEnum, UserNavbarProps } from '@/types/navbar.types'
import styled from '@emotion/styled'
import Link from 'next/link'
import { QakuLogo } from '../Icons/QakuLogo'
import { Tab } from '../Tab'

type Props = Omit<UserNavbarProps, 'title' | 'count' | 'id'> & {
  navProps?: Partial<UserNavbarProps>
}

const UserMobileNav = ({ mode, navProps, onModeChange, ...props }: Props) => {
  return (
    <Container {...props}>
      <Link href={HOME}>
        <QakuLogo width={30} height={30} />
      </Link>
      <TabWrapper>
        <Tab
          options={[
            { id: 'qna', label: 'Q&A' },
            { id: 'polls', label: 'Polls' },
          ]}
          activeId={mode}
          onChange={(id) => onModeChange?.(id as NavbarModeEnum)}
          itemWidth="100px"
        />
      </TabWrapper>
      <Placeholder />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 8px 0 8px;
  padding: 8px;

  svg {
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.sm + 1}px) {
    display: none;
  }
`

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Placeholder = styled.div`
  width: 30px;
`

export default UserMobileNav
