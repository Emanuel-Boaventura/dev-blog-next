import AuthLayout from '@/layouts/AuthLayout'
import { registerSchema, TRegisterSchema } from '@/schemas/auth/registerSchema'
import { useRegister } from '@/services/auth/useRegister'
import { handleError } from '@/utils/handleError'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import s from './styles.module.scss'

export default function Register() {
  const { trigger, isMutating } = useRegister()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: yupResolver(registerSchema),
  })

  async function onSubmit(form: TRegisterSchema) {
    try {
      await trigger(form)

      showNotification({
        title: 'Conta criada com sucesso!',
        message: `Faça o login para acessar!`,
        color: 'teal',
        autoClose: 8000,
      })

      router.push('/login')
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <AuthLayout
      title='Crie uma conta!'
      buttonText='Criar conta'
      redirect='/login'
      redirectText='Já tem uma conta?'
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isMutating}
    >
      <TextInput
        {...register('name')}
        label='Usuário'
        placeholder='Digite seu nome de usuário'
        error={errors.name?.message}
        className={s.input}
        disabled={isMutating}
      />

      <TextInput
        {...register('email')}
        label='Email'
        type='email'
        placeholder='Digite seu melhor email'
        error={errors.email?.message}
        className={s.input}
      />
    </AuthLayout>
  )
}
