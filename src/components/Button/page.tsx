import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface Button {
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
  handleFunction?: () => void
  maxWidth?: string
  maxHeight?: string
  children: ReactNode
}

export function Button({
  type = 'button',
  disabled = false,
  handleFunction,
  maxWidth = '8rem',
  maxHeight = '6rem',
  children,
}: Button) {
  return (
    <button
      className={styles.buttonStyled}
      type={type}
      style={{ maxHeight, maxWidth }}
      onClick={handleFunction ? () => handleFunction() : () => {}}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
