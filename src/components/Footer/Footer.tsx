import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <PoweredBySection>
        <WakuLogo
          width={18}
          height={18}
          src="/brand/waku-logo-white.svg"
          alt="Waku logo"
        />
        <PoweredByText>Powered by Waku</PoweredByText>
      </PoweredBySection>
      <Divider />
      <LinkGroup>
        <FooterLink href="#">Terms of use</FooterLink>
        <FooterLink href="#">Privacy policy</FooterLink>
      </LinkGroup>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);

  margin-top: auto;
  margin-bottom: 24px;

  width: 100%;
  gap: 20px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`

const PoweredBySection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: start;
  margin: auto 0;
`

const WakuLogo = styled(Image)`
  object-fit: contain;
  object-position: center;
  width: 18px;
  align-self: stretch;
  margin: auto 0;
`

const PoweredByText = styled.span`
  opacity: 0.7;
  margin: auto 0;
`

const Divider = styled.div`
  background: var(--white);
  opacity: 0.2;
  width: 1px;
  height: 16px;
`

const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: start;
  margin: auto 0;
`

const FooterLink = styled(Link)`
  opacity: 0.7;
  margin: auto 0;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
