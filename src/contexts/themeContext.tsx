'use client'
import { createContext, ReactNode, useEffect } from 'react'
import useDarkMode from 'use-dark-mode'

interface ThemeContextData {
  statusDarkMode: boolean
  handleThemeToggle: () => void
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const storageKey = 'dark-theme-cidade-alta-minigame@1.0.0v'

  // classNameLight
  const {
    value: statusDarkMode,
    toggle: handleThemeToggle,
    disable: disableDarkMode,
  } = useDarkMode(false, { storageKey })

  useEffect(() => {
    const themeModeLocalStorage = localStorage.getItem(storageKey)

    if (themeModeLocalStorage === null) {
      disableDarkMode()
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ statusDarkMode, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
