import { TypographyGenericFontFamily } from '@acid-info/lsd-react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ThemeState = {
  mode: ThemeMode
  genericFontFamily: TypographyGenericFontFamily | 'Inter'
}

export const defaultThemeState: ThemeState = {
  mode: ThemeMode.LIGHT,
  genericFontFamily: 'Inter',
}

const themeAtom = atomWithStorage<ThemeState>('theme', defaultThemeState)

const wrapThemeState = (
  theme: ThemeState,
  setTheme: (value: ThemeState) => void,
) => ({
  theme,
  get: () => theme,
  getMode: () => theme.mode,
  getGenericFontFamily: () => theme.genericFontFamily,
  setTheme: (value: ThemeState) => {
    setTheme(value)
  },
  setMode: (mode: ThemeState['mode']) => {
    const newTheme = { ...theme, mode }
    setTheme(newTheme)
  },
  toggleMode: () => {
    const newMode: ThemeState['mode'] =
      theme.mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK
    const newTheme = { ...theme, mode: newMode }
    setTheme(newTheme)
  },
})

export const useThemeState = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  return wrapThemeState(theme, setTheme)
}

export const useIsDarkTheme = () => {
  const themeState = useThemeState()
  return themeState.getMode() === ThemeMode.DARK
}

export default useThemeState
