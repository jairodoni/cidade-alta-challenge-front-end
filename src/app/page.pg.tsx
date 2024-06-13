'use client'
import { useTheme } from '@/hooks/themeProfile'

export default function Home() {
  const { handleThemeToggle } = useTheme()

  return <button onClick={() => handleThemeToggle()}>Trocar tema</button>
}
