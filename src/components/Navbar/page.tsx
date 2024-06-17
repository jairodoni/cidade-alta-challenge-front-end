import Image from 'next/image'
import logoWithBackground from '@/assets/imgs/logo-with-background.svg'
import { SunHorizon, MoonStars } from '@phosphor-icons/react/dist/ssr'
import { useTheme } from '@/hooks/themeProfile'
import { useMinigames } from '@/hooks/useMinigames'

import styles from './styles.module.scss'

export function Navbar() {
  const { statusDarkMode, handleThemeToggle } = useTheme()
  const { currentProfile } = useMinigames()

  return (
    <div className={styles.navbar}>
      <div>
        <Image src={logoWithBackground} alt="" />
        <div>
          <span>{currentProfile?.nickname}</span>
          <button className={styles.darkModeButton} onClick={handleThemeToggle}>
            {statusDarkMode ? (
              <SunHorizon size={20} />
            ) : (
              <MoonStars size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
