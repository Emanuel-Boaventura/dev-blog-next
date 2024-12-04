import { RootLayout } from '@/layouts/RootLayout'
import {
  createPostSchema,
  TCreatePostSchema,
} from '@/schemas/posts/createSchema'
import { useRegister } from '@/services/auth/useRegister'
import { useGetAllPosts } from '@/services/posts/useGetAll'
import { handleError } from '@/utils/handleError'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { NextPageWithLayout } from '../../_app'
import s from './styles.module.scss'
import { useCreatePost } from '@/services/posts/useCreate'

const NewPost: NextPageWithLayout = () => {
  const { trigger, isMutating } = useCreatePost()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreatePostSchema>({
    resolver: yupResolver(createPostSchema),
  })

  async function onSubmit(form: TCreatePostSchema) {
    try {
      const { data } = await trigger(form)
      console.log('data:', data)

      showNotification({
        title: 'Post criado com sucesso!',
        message: `Divulge para que todos possam ver!`,
        color: 'teal',
      })

      router.push('/home')
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('title')}
        label='Titulo'
        error={errors.title?.message}
        className={s.input}
      />

      <Textarea
        {...register('description')}
        label='Descrição'
        error={errors.description?.message}
        className={s.input}
        autosize
        minRows={4}
      />

      <Button type='submit'>CRIAR POST</Button>
    </form>
  )
}

NewPost.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default NewPost
