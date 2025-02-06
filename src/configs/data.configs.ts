import { siteConfigs } from '@/configs/site.configs'
import { FooterGroup } from '@/types/ui.types'

export const NavLinksItems = [
  { label: 'Articles', href: '/articles' },
  { label: 'Media', href: '/media' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
]

export const FooterLinksItems: {
  info: FooterGroup
  social: FooterGroup
} = {
  info: {
    title: null,
    key: 'info',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Contact us', href: '/contact-us' },
    ],
  },
  social: {
    title: null,
    key: 'social',
    links: [
      { label: 'X', href: `https://x.com/${siteConfigs.xHandle}`, key: 'x' },
    ],
  },
}
