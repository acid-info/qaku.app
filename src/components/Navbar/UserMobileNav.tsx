import { breakpoints } from '@/configs/ui.configs'
import { HOME } from '@/data/routes'
import { NavbarModeEnum, UserNavbarProps } from '@/types/navbar.types'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { QakuLogo } from '../Icons/QakuLogo'
import { Tab } from '../Tab'

type Props = Omit<UserNavbarProps, 'title' | 'count' | 'id'> & {
  navProps?: Partial<UserNavbarProps>
  onClickLogo?: () => void
}

const UserMobileNav = ({
  mode,
  navProps,
  onModeChange,
  onClickLogo,
  ...props
}: Props) => {
  const router = useRouter()

  const onClickLogoDefault = () => {
    router.push(HOME)
  }

  const handleLogoClick = onClickLogo || onClickLogoDefault

  return (
    <Container {...props}>
      <QakuLogo onClick={handleLogoClick} width={30} height={30} />
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
  margin: 8px;
  padding: 8px;

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
