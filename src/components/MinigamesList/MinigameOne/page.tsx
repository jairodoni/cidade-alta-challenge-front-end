'use client'
import Image from 'next/image'
import styles from './styles.module.scss'
import logo from '@/assets/imgs/logo.svg'
import { generateRandomCode } from '@/utils/generateRandomCode'
import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../../Button/page'
import { useCountdown } from '@/hooks/useCoundown'
import { CardBase } from '@/components/CardBase/page'
import { useMinigames } from '@/hooks/useMinigames'

const validationFormSchema = z.object({
  codeTyped: z.string().max(6).toLowerCase(),
  code: z.string().max(6).toLowerCase(),
  errorMessage: z.string(),
})

type ValidationFormSchema = z.infer<typeof validationFormSchema>

export function MinigameOne() {
  const {
    percentTimeBar,
    startCountdown,
    setIsActive,
    setHasFinished,
    isActive,
    resetCountdown,
  } = useCountdown()
  const { systemProfilePoints } = useMinigames()
  // controle de dados/formulario mais validação de tipos
  const { register, watch, setFocus, setValue, reset } =
    useForm<ValidationFormSchema>({
      resolver: zodResolver(validationFormSchema),
      defaultValues: {
        codeTyped: '',
        code: '',
        errorMessage: '',
      },
    })

  // variaveis observadas por ref
  const codeTyped = watch('codeTyped')
  const code = watch('code')
  const errorMessage = watch('errorMessage')

  // gerador de codigos
  function generateCode() {
    const getNewCode = generateRandomCode(6)
    setValue('code', getNewCode)
  }

  // iniciar desafio
  async function startChallenge() {
    await reset()
    resetCountdown()
    generateCode()
    startCountdown()
    setFocus('codeTyped')
  }

  function validationMinigameFormSchema() {
    if (codeTyped.length === 0) return

    const lastPosition = codeTyped.length - 1

    for (let position = 0; position < codeTyped.length; position++) {
      const codeTypedLastPosition = codeTyped[lastPosition].toLowerCase()
      const codeLastPosition = code[lastPosition].toLowerCase()
      const currentCharStatus = code.includes(codeTypedLastPosition)

      if (!currentCharStatus) {
        resetCountdown()
        setValue('errorMessage', 'Digitou o codigo errado!')
      }

      if (currentCharStatus && codeTypedLastPosition !== codeLastPosition) {
        resetCountdown()
        setValue('errorMessage', 'Digitou o codigo na ordem errada!')
      }
    }
  }

  useEffect(() => {
    validationMinigameFormSchema()

    if (codeTyped.length === 6 && errorMessage.length === 0) {
      new Audio('/vitoria.mp3').play()
      systemProfilePoints()
      setHasFinished(true)
      setIsActive(false)
    }
  }, [codeTyped])

  useEffect(() => {
    if (errorMessage.length > 0) {
      new Audio('/error.mp3').play()
      setHasFinished(true)
      setIsActive(false)
    }
  }, [errorMessage])

  const listStringCode =
    code.length > 0 ? code.split('') : ['', '', '', '', '', '']

  const textButtonDefault = code.length === 6 ? 'Jogar novamente?' : 'Start'

  return (
    <CardBase maxWidth="95%" maxHeight="95%">
      <form className={styles.container}>
        <div>
          <Image src={logo} alt="" />
          <h3>Minigame One</h3>
          <p>Preencha o campo na ordem correta dentro do tempo.</p>

          <div className={styles.renderCode}>
            {listStringCode.map((char, index) => {
              return (
                <div
                  key={index}
                  className={`
                  ${styles.charCode}
                  ${
                    codeTyped.length <= index || errorMessage.length > 0
                      ? styles.defaultBorderChar
                      : styles.activedBorderChar
                  }
                `}
                  onClick={() => setFocus('codeTyped')}
                >
                  <p>{char.toUpperCase()}</p>
                </div>
              )
            })}

            <input
              type="text"
              autoFocus
              placeholder="Digite o codigo"
              className={styles.ocultedInput}
              disabled={codeTyped.length === 6 || errorMessage.length > 0}
              {...register('codeTyped')}
            />
          </div>

          <h4 style={{ opacity: errorMessage.length > 0 ? '100%' : 0 }}>
            {errorMessage}
          </h4>
          <Button
            type="button"
            handleFunction={startChallenge}
            maxWidth="fit-content"
            maxHeight="4rem"
            disabled={isActive}
          >
            {errorMessage.length > 0 ? 'Tentar novamente?' : textButtonDefault}
          </Button>
        </div>
        <hr
          className={styles.timeBar}
          style={{
            width: `${Math.floor(percentTimeBar)}%`,
            opacity: `${isActive ? 100 : 0}`,
          }}
        />
      </form>
    </CardBase>
  )
}
