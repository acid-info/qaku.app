import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

// Doc: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
// Font: https://vercel.com/docs/functions/edge-functions/og-image-generation/og-image-examples#using-a-custom-font
export default async function handler(request: NextRequest) {
  const { href } = request.nextUrl

  const searchParams = new URL(href).searchParams
  const pagePath = searchParams.get('pagePath') || '/'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
          color: '#1400ff',
          position: 'relative',
          fontFamily: 'serif',
          padding: '39px 45px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              fontSize: '54px',
              lineHeight: '73px',
              fontWeight: '400',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {pagePath === '/' ? null : pagePath === '/media' ? (
              <div>Media</div>
            ) : pagePath === '/articles' ? (
              <div>Articles</div>
            ) : pagePath === '/about' ? (
              <div>About</div>
            ) : pagePath === '/shop' ? (
              <div>Shop</div>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '52px',
              fontWeight: '400',
              textAlign: 'center',
              height: '100%',
              width: '1073px',
              margin: '0 auto',
            }}
          >
            <div>Acid is designing the future.</div>
            <div>
              The future is a second enlightenment of the digital world.
            </div>
            <img
              src="https://new-acid-info.vercel.app/og/mark.svg"
              width={'400px'}
              height={'400px'}
              alt="og-asset"
              style={{
                position: 'absolute',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
