import { RootLayout } from '@/layouts/RootLayout'
import {
  TUpdateProfileSchema,
  updateProfileSchema,
} from '@/schemas/auth/updateProfileSchema'
import { useLogin } from '@/services/auth/useLogin'
import { useProfile } from '@/services/auth/useProfile'
import { useUpdateProfile } from '@/services/auth/useUpdateProfile'
import { handleError } from '@/utils/handleError'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, LoadingOverlay, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { setCookie } from 'nookies'
import { useEffect, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { NextPageWithLayout } from '../_app'
import s from './styles.module.scss'

const Profile: NextPageWithLayout = () => {
  const { data, isLoading: isGetting, mutate } = useProfile()
  const { trigger: updateProfile, isMutating: isUpdating } = useUpdateProfile(
    data?.id,
  )
  const { trigger: updateJwt, isMutating: isUpdatingToken } = useLogin()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUpdateProfileSchema>({
    resolver: yupResolver(updateProfileSchema),
  })

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
      })
    }
  }, [data])

  async function onSubmit(form: TUpdateProfileSchema) {
    try {
      await updateProfile(form)

      const { data } = await updateJwt(form)

      setCookie(null, 'dev-blog-userToken', data.access_token, {
        maxAge: 24 * 60 * 60 * 30, // 30 days
        path: '/',
      })

      showNotification({
        title: 'Sucesso!',
        message: `Perfil atualizado com sucesso!`,
        color: 'teal',
      })

      mutate()
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.content}>
      <LoadingOverlay
        visible={isGetting}
        overlayProps={{ radius: 'sm' }}
        loaderProps={{ type: 'bars' }}
      />

      <h1>Meu perfil</h1>

      <TextInput
        {...register('name')}
        label='Usuário'
        placeholder='Digite seu nome de usuário'
        error={errors.name?.message}
        className={s.input}
        disabled={isGetting}
      />

      <TextInput
        {...register('email')}
        label='Usuário'
        type='email'
        placeholder='Digite seu melhor email'
        error={errors.email?.message}
        className={s.input}
        disabled={isGetting}
      />

      <Button
        type='submit'
        loading={isUpdating || isUpdatingToken}
        disabled={isUpdating || isUpdatingToken || isGetting}
        className={s.button}
      >
        Atualizar perfil
      </Button>
    </form>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default Profile
