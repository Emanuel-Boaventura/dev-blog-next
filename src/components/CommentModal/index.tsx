import { commentSchema, TCommentSchema } from '@/schemas/comments/commentSchema'
import { useCreateComment } from '@/services/comments/useCreate'
import { useEditComment } from '@/services/comments/useEdit'
import { IComment } from '@/services/comments/useGetAllPostComments'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Group, Textarea } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useForm } from 'react-hook-form'

interface ICommentModal {
  postId?: number
  comment?: IComment
  refreshComments: () => void
}

export const CommentModal = ({
  context,
  id,
  innerProps: { postId, comment, refreshComments },
}: ContextModalProps<ICommentModal>) => {
  const { trigger: createComment, isMutating: isCreating } =
    useCreateComment(postId)
  const { trigger: editComment, isMutating: isEditing } = useEditComment(
    comment?.id,
  )

  const isLoading = isCreating || isEditing

  function closeModal() {
    context.closeModal(id)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommentSchema>({
    resolver: yupResolver(commentSchema),
    defaultValues: { description: comment?.description ?? '' },
  })

  async function onSubmit(form: TCommentSchema) {
    try {
      if (postId) {
        await createComment(form)
      } else {
        await editComment(form)
      }

      showNotification({
        title: `Comentário ${postId ? 'criado' : 'editado'}!`,
        message: `Seu comentário foi ${
          postId ? 'criado' : 'editado'
        } com sucesso.`,
        color: 'teal',
      })

      refreshComments()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register('description')}
        label='Descrição'
        error={errors.description?.message}
        autosize
        minRows={4}
      />

      <Group grow>
        <Button
          mt='md'
          variant='light'
          onClick={closeModal}
          disabled={isLoading}
          loading={isLoading}
        >
          Cancelar
        </Button>

        <Button mt='md' type='submit' disabled={isLoading} loading={isLoading}>
          {postId ? 'Postar' : 'Editar'}
        </Button>
      </Group>
    </form>
  )
}
