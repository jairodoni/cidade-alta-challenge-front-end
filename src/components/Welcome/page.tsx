import Image from 'next/image'
import { CardBase } from '../CardBase/page'
import logo from '@/assets/imgs/logo.svg'

import styles from './styles.module.scss'

export function Welcome() {
  return (
    <CardBase maxWidth="95%" maxHeight="95%">
      <div className={styles.container}>
        <Image src={logo} alt="" />
        <h3>Bem Vindo!</h3>
        <hr />
        <p>Escolha um minigame e divirta-se!</p>
      </div>
    </CardBase>
  )
}
