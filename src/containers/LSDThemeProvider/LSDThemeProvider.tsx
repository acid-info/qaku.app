import { useThemeState } from '@/states/themeState/theme.state'
import { ThemeProvider, ThemeProviderProps } from '@acid-info/lsd-react'
import { Global } from '@emotion/react'
import React, { useEffect } from 'react'
import { useLSDTheme } from './themes'

export type LSDThemeProviderProps = Partial<ThemeProviderProps>

export const LSDThemeProvider: React.FC<LSDThemeProviderProps> = ({
  children,
  ...props
}) => {
  const theme = useLSDTheme()
  const { getMode, getGenericFontFamily } = useThemeState()

  useEffect(() => {
    const html = document.querySelector('html') as HTMLElement
    html.setAttribute('data-theme', getMode())
    html.setAttribute('data-font-family', getGenericFontFamily())
  }, [getMode, getGenericFontFamily])

  return (
    <ThemeProvider theme={theme.current} injectCssVars={false}>
      <Global styles={theme.darkCssVars} />
      <Global styles={theme.lightCssVars} />
      {children}
    </ThemeProvider>
  )
}
