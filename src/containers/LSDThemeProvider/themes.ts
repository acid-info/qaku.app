import {
  createTheme,
  CreateThemeProps,
  defaultThemes,
  Theme,
} from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import { useMemo } from 'react'
import { useThemeState } from '../../states/themeState/theme.state'

const baseThemes = defaultThemes

const useThemeCssVars = (theme: Theme, colorMode: string) =>
  useMemo(
    () => css`
      [data-theme=${colorMode}] {
        ${theme.cssVars}
      }

      [data-font-family='sans-serif'] {
        --lsd-typography-generic-font-family: sans-serif;
      }

      [data-font-family='serif'] {
        --lsd-typography-generic-font-family: serif;
      }

      [data-font-family='monospace'] {
        --lsd-typography-generic-font-family: monospace;
      }
    `,
    [theme, colorMode],
  )

export const useLSDTheme = () => {
  const { getGenericFontFamily, getMode } = useThemeState()

  const themes = useMemo(() => {
    const baseOptions: CreateThemeProps = {
      breakpoints: {
        sm: { width: 768 },
        md: { width: 1024 },
        lg: { width: 1280 },
        xl: { width: 1440 },
      },
      spacing: [],
      palette: {},
      typography: {},
      typographyGlobal: {
        genericFontFamily: getGenericFontFamily() as any,
      },
    }

    return {
      light: createTheme(
        {
          ...baseOptions,
          palette: {
            primary: '20, 0, 255',
            secondary: '255, 255, 255',
          },
        },
        baseThemes.light,
      ),
      dark: createTheme(baseOptions, baseThemes.dark),
    }
  }, [getGenericFontFamily])

  return {
    dark: themes.dark,
    light: themes.light,
    current: themes[getMode()],
    lightCssVars: useThemeCssVars(themes.light, 'light'),
    darkCssVars: useThemeCssVars(themes.dark, 'dark'),
  }
}
