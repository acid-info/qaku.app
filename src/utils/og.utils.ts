import { getWebsiteUrl } from './route.utils'

export const getOpenGraphImageUrl = ({
  title,
  imageUrl,
  pagePath,
}: {
  title?: string | null
  imageUrl?: string | null
  pagePath?: string | null
}) => {
  const url = new URL('/api/og', getWebsiteUrl())
  const searchParams = url.searchParams

  title && searchParams.set('title', title)
  imageUrl && searchParams.set('image', imageUrl || '')
  pagePath && searchParams.set('pagePath', pagePath || '')

  return url.toString()
}

export const removeSlashAndCapitalize = (str: string) => {
  if (str.charAt(0) === '/') {
    str = str.slice(1)
  }

  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

  return capitalized
}
