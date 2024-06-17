import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface CardProps {
  maxWidth?: string
  maxHeight?: string
  children: ReactNode
}

export function CardBase({
  maxWidth = '24rem',
  maxHeight = '12rem',
  children,
}: CardProps) {
  return (
    <div className={styles.container} style={{ maxWidth, maxHeight }}>
      {children}
    </div>
  )
}
