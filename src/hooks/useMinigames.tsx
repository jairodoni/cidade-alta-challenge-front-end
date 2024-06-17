import { MinigamesContext } from '@/contexts/minigamesContext'
import { useContext } from 'react'

export const useMinigames = () => {
  return useContext(MinigamesContext)
}
