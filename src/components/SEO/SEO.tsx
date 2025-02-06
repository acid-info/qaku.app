import { siteConfigs } from '@/configs/site.configs'
import { getOpenGraphImageUrl } from '@/utils/og.utils'
import { getWebsiteUrl } from '@/utils/route.utils'
import Head from 'next/head'

type Metadata = {
  title?: string
  description?: string
  type?: string
  locale?: string
  site_name?: string
  pageURL?: string
  imageUrl?: string
  image?: string | null
  tags?: string[]
  pagePath?: string
  date?: string | null
  contentType?: string
  noIndex?: boolean
}

const SITE_URL = getWebsiteUrl()

export default function SEO({
  title: _title,
  description: _description,
  type,
  locale,
  site_name,
  pageURL,
  imageUrl,
  tags = [],
  pagePath = '',
  noIndex = false,
}: Metadata) {
  const ogImageUrl =
    imageUrl ||
    getOpenGraphImageUrl({
      pagePath,
    })

  const title = _title || siteConfigs.title
  const description = _description || siteConfigs.description

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={locale ?? 'en-US'} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type ?? 'website'} />
      <meta property="og:url" content={pageURL ?? `${SITE_URL}${pagePath}`} />
      <meta property="keywords" content={tags.join(', ')} />
      <meta property="og:site_name" content={site_name ?? siteConfigs.title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageURL ?? `${SITE_URL}${pagePath}`} />
      <meta name="twitter:site" content={`@${siteConfigs.xHandle}`} />
      <meta property="twitter:image" content={ogImageUrl} />
      <link rel="canonical" href={`${SITE_URL}${pagePath}`} />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${getWebsiteUrl()}/rss.xml`}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href={`${getWebsiteUrl()}/atom.xml`}
      />
      {noIndex && (
        <>
          <meta name="robots" content="noindex, nofollow" />
        </>
      )}
    </Head>
  )
}
