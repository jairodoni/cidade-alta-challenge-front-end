'use client'
import { ThemeContext } from '@/contexts/themeContext'
import { useContext } from 'react'

export const useTheme = () => {
  return useContext(ThemeContext)
}
