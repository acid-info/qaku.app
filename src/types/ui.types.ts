import { ReactNode } from 'react'

export type FooterItem = {
  label: string | null
  href: string
  icon?: ReactNode
  key?: string
}

export type FooterGroup = {
  title: string | null
  key?: string
  links: FooterItem[]
}
