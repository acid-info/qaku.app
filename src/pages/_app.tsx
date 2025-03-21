import { DefaultLayoutContainer } from '@/containers/DefaultLayout'
import { WagmiContextProvider } from '@/contexts/WagmiContextProvider'
import { css, Global } from '@emotion/react'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode } from 'react'
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
      <WagmiContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </WagmiContextProvider>
    </>
  )
}
