import { createContext, ReactNode, useEffect, useState } from 'react'

interface Profile {
  id: number
  nickname: string
  points: number
}

interface MinigamesContextData {
  currentMinigame: number
  currentProfile: Profile | null
  profileList: Profile[] | []
  setCurrentMinigame: (currentMinigame: number) => void
  createNewProfile: (nickname: string) => void
  selectCurrentProfile: (id: number) => void
  setCurrentProfile: (currentProfile: Profile | null) => void
  systemProfilePoints: () => void
}

interface MinigamesProviderProps {
  children: ReactNode
}

export const MinigamesContext = createContext({} as MinigamesContextData)

export function MinigamesProvider({ children }: MinigamesProviderProps) {
  const [currentMinigame, setCurrentMinigame] = useState(0)
  const [profileList, setProfileList] = useState<Profile[]>([])
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)

  async function getStorage() {
    const profile = await localStorage.getItem(
      'cidade-alta-minigame-ranking@1.0.0v',
    )

    if (profile) {
      const convertProfile = JSON.parse(profile)
      if (convertProfile?.listProfile?.length > 0) {
        setProfileList(convertProfile?.listProfile)
      }
    }
  }

  useEffect(() => {
    getStorage()
  }, [currentProfile])

  function selectCurrentProfile(id: number) {
    const filterProfile = profileList.filter((profile) => profile.id === id)
    setCurrentProfile(filterProfile[0])
  }

  async function createNewProfile(nickname: string) {
    const id = profileList.length > 0 ? profileList.length + 1 : 1

    const profileFormated = {
      id,
      nickname,
      points: 0,
    }

    const newProfile = {
      currentProfile: profileFormated,
      listProfile:
        profileList.length > 0
          ? [...profileList, profileFormated]
          : [profileFormated],
    }

    setCurrentProfile(newProfile.currentProfile)

    await localStorage.setItem(
      'cidade-alta-minigame-ranking@1.0.0v',
      JSON.stringify(newProfile),
    )
  }

  async function systemProfilePoints() {
    if (!currentProfile) return

    const profileListFiltred = profileList.filter(
      (profile) => profile.id !== currentProfile.id,
    )
    const profileFormated = {
      ...currentProfile,
      points: currentProfile?.points + 50,
    }

    const updateProfiles = {
      currentProfile: profileFormated,
      listProfile:
        profileListFiltred.length > 0
          ? [...profileListFiltred, profileFormated]
          : [profileListFiltred],
    }

    setCurrentProfile(profileFormated)

    await localStorage.setItem(
      'cidade-alta-minigame-ranking@1.0.0v',
      JSON.stringify(updateProfiles),
    )
  }

  return (
    <MinigamesContext.Provider
      value={{
        currentMinigame,
        currentProfile,
        profileList,
        setCurrentMinigame,
        createNewProfile,
        selectCurrentProfile,
        setCurrentProfile,
        systemProfilePoints,
      }}
    >
      {children}
    </MinigamesContext.Provider>
  )
}
