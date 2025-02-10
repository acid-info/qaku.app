import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { WakuLogo } from '../Icons/WakuLogo'

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <BrandSection>
        <WakuLogo width={18} height={18} />
        <PoweredByText>Powered by Waku</PoweredByText>
      </BrandSection>
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
  position: relative;
  color: var(--white);

  margin-top: auto;
  padding-bottom: var(--footer-margin);

  width: 100%;
  gap: 20px;
`

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: start;
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
