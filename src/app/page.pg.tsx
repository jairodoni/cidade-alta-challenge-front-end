'use client'
import { CardProfile } from '@/components/CardProfile/page'
import { MinigamesList } from '@/components/MinigamesList/page'
import { Navbar } from '@/components/Navbar/page'
import { Welcome } from '@/components/Welcome/page'
import { CountdownProvider } from '@/contexts/countdownContext'
import { ThemeProvider } from '@/contexts/themeContext'
import { useMinigames } from '@/hooks/useMinigames'
import styles from '@/styles/home.module.scss'

export default function Home() {
  const { currentMinigame } = useMinigames()
  return (
    <ThemeProvider>
      <CountdownProvider>
        <div className={styles.container}>
          <Navbar />
          <div className={styles.main}>
            <CardProfile />

            {currentMinigame === 0 && <Welcome />}
            {currentMinigame !== 0 && <MinigamesList />}
          </div>
        </div>
      </CountdownProvider>
    </ThemeProvider>
  )
}
