import { RootLayout } from '@/layouts/RootLayout'
import {
  createPostSchema,
  TCreatePostSchema,
} from '@/schemas/posts/createSchema'
import { getPostById, IPostFullData } from '@/services/posts/getPostById'
import { useEditPost } from '@/services/posts/useEditPost'
import { handleError } from '@/utils/handleError'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { NextPageWithLayout } from '../../_app'
import s from './styles.module.scss'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string }

  const cookies = nookies.get(context)
  const token = cookies['dev-blog-userToken']

  try {
    const post = await getPostById(id, token)

    return { props: { post } }
  } catch (error) {
    return { props: { post: null } }
  }
}

interface IEditPost {
  post: IPostFullData
}

const EditPost: NextPageWithLayout<IEditPost> = ({ post }) => {
  const { trigger, isMutating } = useEditPost(post.id)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreatePostSchema>({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
    },
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

      <Button type='submit' disabled={isMutating} loading={isMutating}>
        EDITAR POST
      </Button>
    </form>
  )
}

EditPost.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default EditPost
