import AuthLayout from '@/layouts/AuthLayout'
import { loginSchema, TLoginSchema } from '@/schemas/auth/loginSchema'
import { useLogin } from '@/services/auth/useLogin'
import { handleError } from '@/utils/handleError'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { useForm } from 'react-hook-form'
import s from './styles.module.scss'

export default function Login() {
  const { trigger, isMutating } = useLogin()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: yupResolver(loginSchema),
  })

  async function onSubmit(form: TLoginSchema) {
    try {
      const { data } = await trigger(form)

      showNotification({
        title: 'Login feito com sucesso!',
        message: `Bem-vindo de volta, ${data.name}!`,
        color: 'teal',
      })

      setCookie(null, 'dev-blog-userToken', `${data.id}-${data.email}`, {
        maxAge: 24 * 60 * 60 * 30, // 30 days
        path: '/',
      })

      router.push('/home')
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <AuthLayout
      title='Faça o seu login!'
      buttonText='Entrar'
      redirect='/register'
      redirectText='Não tem uma conta?'
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isMutating}
    >
      <TextInput
        {...register('name')}
        label='Usuário'
        placeholder='name seu nome de usuário'
        error={errors.email?.message}
        className={s.input}
      />

      <TextInput
        {...register('email')}
        label='Usuário'
        type='email'
        placeholder='Digite seu melhor email'
        error={errors.email?.message}
        className={s.input}
      />
    </AuthLayout>
  )
}
