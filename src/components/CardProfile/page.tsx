import { useState } from 'react'
import Image from 'next/image'
import { useMinigames } from '@/hooks/useMinigames'
import { CardBase } from '../CardBase/page'
import perfilImageDefault from '@/assets/imgs/perfil-image.png'
import styles from './styles.module.scss'

export function CardProfile() {
  const [currentCard, setCurrentCard] = useState('ranking')
  const { setCurrentMinigame, currentProfile, profileList } = useMinigames()

  function handleCurrentCard() {
    if (currentCard === 'ranking') setCurrentCard('minigames')
    if (currentCard === 'minigames') setCurrentCard('ranking')
  }

  const profileListSort = profileList.sort((a, b) => b.points - a.points)

  return (
    <CardBase maxHeight="95%">
      <div className={styles.container}>
        <div className={styles.perfil}>
          <Image src={perfilImageDefault} width={200} height={200} alt="" />
          <h3>{currentProfile ? currentProfile?.nickname : 'John Doe'}</h3>
        </div>
        <hr />
        <div className={styles.buttons}>
          <button
            className={currentCard === 'ranking' ? styles.active : ''}
            onClick={handleCurrentCard}
          >
            Ranking
          </button>
          <button
            className={currentCard === 'minigames' ? styles.active : ''}
            onClick={handleCurrentCard}
          >
            Minigames
          </button>
        </div>
        <hr />
        {currentCard === 'ranking' && (
          <div className={styles.ranking}>
            <div className={styles.headerTable}>
              <h4>Nome</h4>
              <h4>Pontos</h4>
            </div>
            {profileListSort.length > 0 &&
              profileListSort.map((profile) => (
                <div key={profile.id} className={styles.tableItem}>
                  <span>{profile.nickname}</span>
                  <span>{profile.points}p</span>
                </div>
              ))}
          </div>
        )}
        {currentCard === 'minigames' && (
          <div className={styles.minigames}>
            <h4>Selecione uma opção:</h4>
            {[1].map((item) => (
              <div
                key={item}
                className={styles.itemList}
                onClick={() => {
                  setCurrentMinigame(item)
                }}
              >
                <span>Minigame {item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </CardBase>
  )
}
