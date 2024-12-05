import { DropzoneArea } from '@/components/DropzoneArea'
import { RootLayout } from '@/layouts/RootLayout'
import { postSchema, TPostSchema } from '@/schemas/posts/postSchema'
import { getPostById, IPostFullData } from '@/services/posts/getPostById'
import { useEditPost } from '@/services/posts/useEdit'
import { handleError } from '@/utils/handleError'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useState, type ReactElement } from 'react'
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

interface IEditPostPage {
  post: IPostFullData
}

const EditPost: NextPageWithLayout<IEditPostPage> = ({ post }) => {
  const { trigger: editPost, isMutating } = useEditPost(post.id)
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostSchema>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: post?.title,
      description: post?.description,
    },
  })

  async function onSubmit(form: TPostSchema) {
    try {
      const formData = new FormData()

      if (file) formData.append('file', file)
      formData.append('title', form.title)
      formData.append('description', form.description)

      const { data } = await editPost(formData)

      showNotification({
        title: 'Post editado com sucesso!',
        message: `Divulge para que todos possam ver!`,
        color: 'teal',
      })

      router.push(`/posts/${data.id}`)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Editar Postagem</h1>
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

      <DropzoneArea
        setFile={setFile}
        // imageUrl={post.image_url}
        imageUrl='/assets/logo.png'
      />

      <Button
        fullWidth
        type='submit'
        disabled={isMutating}
        loading={isMutating}
      >
        EDITAR
      </Button>
    </form>
  )
}

EditPost.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default EditPost
