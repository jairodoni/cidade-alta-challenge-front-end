import { CountdownContext } from '@/contexts/countdownContext'
import { useContext } from 'react'

export const useCountdown = () => {
  return useContext(CountdownContext)
}
