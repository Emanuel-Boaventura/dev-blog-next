import { DropzoneArea } from '@/components/DropzoneArea'
import { RootLayout } from '@/layouts/RootLayout'
import { postSchema, TPostSchema } from '@/schemas/posts/postSchema'
import { useCreatePost } from '@/services/posts/useCreate'
import { handleError } from '@/utils/handleError'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { NextPageWithLayout } from '../../_app'
import s from './styles.module.scss'

const NewPost: NextPageWithLayout = () => {
  const { trigger: createPost, isMutating } = useCreatePost()
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostSchema>({
    resolver: yupResolver(postSchema),
  })

  async function onSubmit(form: TPostSchema) {
    try {
      const formData = new FormData()

      if (file) formData.append('file', file)
      formData.append('title', form.title)
      formData.append('description', form.description)

      const { data } = await createPost(formData)

      showNotification({
        title: 'Post criado com sucesso!',
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

      <DropzoneArea setFile={setFile} />

      <Button fullWidth type='submit'>
        CRIAR POST
      </Button>
    </form>
  )
}

NewPost.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default NewPost
