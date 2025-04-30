import { Spinner } from '@/components/Spinner/Spinner'
import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { WagmiContextProvider } from '@/contexts/WagmiContextProvider'
import { WakuContextProvider } from '@/contexts/WakuContextProvider'
import { css, Global } from '@emotion/react'
import { useAtom } from 'jotai'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { loadingAtom } from '../../atoms/loading/loadingAtom'
import '../styles/globals.css'

type NextLayoutComponentType<P = {}> = NextComponentType<
  NextPageContext,
  any,
  P
> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type AppLayoutProps<P = {}> = AppProps & {
  Component: NextLayoutComponentType
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => (
      <DefaultLayoutContainer>{page}</DefaultLayoutContainer>
    ))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      const uaData = (navigator as any).userAgentData

      const isWindows = ua.includes('windows')
      const isAndroid = ua.includes('android')

      const platformHint = uaData?.platform?.toLowerCase?.() || ''

      if (
        isWindows ||
        isAndroid ||
        platformHint.includes('windows') ||
        platformHint.includes('android')
      ) {
        document.body.classList.add('use-inter')
      }
    }
  }, [])

  const router = useRouter()
  const id = String(router.query.id)
  // TODO-vaclav we use the loading atom here
  const [loadingState] = useAtom(loadingAtom)

  return (
    <>
      <Head>
        <title>Qaku: Q&A over Waku</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            width: 100%;
            height: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          #__next {
            margin-left: auto;
            margin-right: auto;
          }
        `}
      />
      {/* TODO-vaclav remove WakuContextProvider? */}
      <WakuContextProvider
        password=""
        qaId={id}
        updateStatus={(s) => {
          console.log(s)
        }}
      >
        <WagmiContextProvider>
          {/* TODO-vaclav we display the loading spinner component conditionally here */}
          {loadingState.isLoading && (
            <Spinner fullScreen message={loadingState.message} />
          )}
          {getLayout(<Component {...pageProps} />)}
        </WagmiContextProvider>
      </WakuContextProvider>
    </>
  )
}
