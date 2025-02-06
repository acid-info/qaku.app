import { DefaultLayout } from '@/layouts/DefaultLayout'
import { css, Global } from '@emotion/react'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode } from 'react'
import { LSDThemeProvider } from '../containers/LSDThemeProvider'

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
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <LSDThemeProvider>
      <Head>
        <title>Logos NextJS Starter</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Global
        styles={css`
          html,
          body {
            background: rgb(var(--lsd-surface-primary));
            color: rgb(var(--lsd-text-primary));
            margin: 0;
            width: 100%;
            height: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-family: serif;
          }

          #__next {
            margin-left: auto;
            margin-right: auto;
          }

          a,
          a:visited,
          a:hover,
          a:active,
          a:focus {
            color: rgb(var(--lsd-text-primary));
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            margin: 0;
            padding: 0;
            word-break: keep-all;
          }

          [data-theme='light'] {
            .light-mode-hidden {
              display: none !important;
            }
          }

          [data-theme='dark'] {
            .dark-mode-hidden {
              display: none !important;
            }
          }
        `}
      />
      {getLayout(<Component {...pageProps} />)}
    </LSDThemeProvider>
  )
}
