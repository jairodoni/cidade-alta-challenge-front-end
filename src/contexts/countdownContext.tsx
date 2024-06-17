import { createContext, ReactNode, useEffect, useState } from 'react'

interface CountdownContextData {
  percentTimeBar: number
  hasFinished: boolean
  isActive: boolean
  setHasFinished: (hasFinished: boolean) => void
  setIsActive: (isActive: boolean) => void
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(0.25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const [percentTimeBar, setPercentTimeBar] = useState(100)
  const [totalTime, setTotalTime] = useState(15)

  const percent = (totalTime * 100) / 20

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
        setTotalTime(totalTime - 1)
        setPercentTimeBar(percent)
      }, 1000)
    } else if (isActive && time === 0) {
      new Audio('/error.mp3').play()
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.25 * 60)
    setHasFinished(false)
    setTotalTime(15)
  }
  return (
    <CountdownContext.Provider
      value={{
        percentTimeBar,
        hasFinished,
        setHasFinished,
        isActive,
        setIsActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
