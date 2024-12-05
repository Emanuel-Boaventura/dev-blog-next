import { IUser } from '@/services/auth/useProfile'
import { IComment } from '@/services/comments/useGetAllPostComments'
import { dateFormatter } from '@/utils/formatters'
import { Button, Card, Menu, Text } from '@mantine/core'
import { openConfirmModal, openContextModal } from '@mantine/modals'
import {
  DotsThreeOutlineVertical,
  PencilLine,
  Trash,
} from '@phosphor-icons/react'
import s from './styles.module.scss'
import { useDeleteComment } from '@/services/comments/useDeleteComment'
import { showNotification } from '@mantine/notifications'

interface ICommentCard {
  comment: IComment
  isPostOwner: boolean
  user?: IUser
  refreshComments: () => void
}

export function CommentCard({
  comment,
  user,
  isPostOwner,
  refreshComments,
}: ICommentCard) {
  const { deleted_at, created_at, deleted_by_owner, description } = comment
  const { trigger: deleteComment, isMutating } = useDeleteComment()

  const isCommentOwner = user?.id === comment.user?.id

  const deletedByMsg = deleted_by_owner ? 'dono.' : 'autor do Post.'

  function openEditModal() {
    openContextModal({
      modal: 'comment',
      title: 'Editar comentário',
      innerProps: { comment, refreshComments },
    })
  }

  async function handleDelete() {
    await deleteComment(comment.id!)

    showNotification({
      title: 'Comentário deletado!',
      message: 'O comentário foi deletado com sucesso.',
      color: 'teal',
    })
    refreshComments()
  }

  function openDeleteModal() {
    openConfirmModal({
      title: 'Deletar comentário?',
      centered: true,
      children: (
        <Text size='sm'>
          Tem certeza que deseja deletar este comentário? Esta ação não pode ser
          desfeita, e ainda ficará visível na publicação que o comentário foi
          deletado.
        </Text>
      ),
      labels: { confirm: 'Delete ', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    })
  }

  if (deleted_at) {
    return (
      <Card className={s.deletedCard}>
        <p>Comentário deletado pelo {deletedByMsg}</p>
      </Card>
    )
  }

  return (
    <Card className={s.card}>
      {(isCommentOwner || isPostOwner) && (
        <Menu shadow='md' position='bottom-end'>
          <Menu.Target>
            <Button color='dark' variant='transparent' className={s.edit}>
              <DotsThreeOutlineVertical weight='duotone' size={20} />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            {isCommentOwner && (
              <>
                <Menu.Item
                  color='blue'
                  onClick={openEditModal}
                  rightSection={<PencilLine weight='bold' />}
                >
                  Editar
                </Menu.Item>

                <Menu.Divider />
              </>
            )}

            <Menu.Item
              color='red'
              onClick={openDeleteModal}
              rightSection={<Trash />}
            >
              Excluir
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
      <h1>{comment.user?.name}</h1>
      <p className={s.date}>Comentado em: {dateFormatter(created_at)}</p>

      <p>{description}</p>
    </Card>
  )
}
