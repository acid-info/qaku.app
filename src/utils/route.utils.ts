export const getWebsiteUrl = () => {
  if (typeof window === 'undefined')
    // return process.env.NEXT_PUBLIC_SITE_URL || 'https://dev.new-acid-info.vercel.app'
    return 'https://new-acid-info.vercel.app'

  const url = new URL(window.location.href)
  return url.origin
}
