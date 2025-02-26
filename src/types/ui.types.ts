import { ReactNode } from 'react'

export type FooterItemType = {
  label: string | null
  href: string
  icon?: ReactNode
  key?: string
}

export type FooterGroupType = {
  title: string | null
  key?: string
  links: FooterItemType[]
}
