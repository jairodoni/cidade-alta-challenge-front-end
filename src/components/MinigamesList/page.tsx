import { useMinigames } from '@/hooks/useMinigames'
import { ProfileManager } from '../ProfileManager/page'
import { MinigameOne } from './MinigameOne/page'

export function MinigamesList() {
  const { currentProfile, currentMinigame } = useMinigames()

  return (
    <>
      {currentProfile === null ? (
        <ProfileManager />
      ) : (
        currentMinigame === 1 && <MinigameOne />
      )}
    </>
  )
}
