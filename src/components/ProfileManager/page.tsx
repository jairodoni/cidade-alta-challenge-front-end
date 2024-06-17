import { zodResolver } from '@hookform/resolvers/zod'
import { CardBase } from '../CardBase/page'
import { useForm } from 'react-hook-form'
import { useMinigames } from '@/hooks/useMinigames'
import Image from 'next/image'
import { z } from 'zod'
import logo from '@/assets/imgs/logo.svg'

import styles from './styles.module.scss'

const registerFormSchema = z.object({
  nickname: z.string().min(3, { message: 'No minimo 3 letras!' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function ProfileManager() {
  const { createNewProfile, profileList, selectCurrentProfile } = useMinigames()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      nickname: '',
    },
  })

  async function handleNewRegister(data: RegisterFormData) {
    if (data.nickname.trim() === '') return
    createNewProfile(data.nickname)
  }

  return (
    <CardBase maxWidth="95%" maxHeight="95%">
      <div className={styles.container}>
        <Image src={logo} alt="" />
        <h4>Crie ou Selecione seu perfil</h4>
        <div className={styles.listProfiles}>
          {profileList.map((profile) => (
            <div
              key={profile.id}
              className={styles.profileSelectItem}
              onClick={() => selectCurrentProfile(profile.id)}
            >
              <span>{profile.nickname}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(handleNewRegister)}>
          <div>
            <input
              type="text"
              {...register('nickname')}
              placeholder="Digite um nickname"
            />

            <button type="submit">Criar perfil</button>
          </div>
          {errors.nickname && <span>{errors.nickname.message}</span>}
        </form>
      </div>
    </CardBase>
  )
}
