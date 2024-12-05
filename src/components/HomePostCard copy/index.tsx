import { IUser } from '@/services/auth/useProfile'
import { IComment } from '@/services/posts/getPostById'
import { dateFormatter } from '@/utils/formatters'
import { Button, Card, Menu } from '@mantine/core'
import {
  DotsThreeOutlineVertical,
  PencilLine,
  Trash,
} from '@phosphor-icons/react'
import s from './styles.module.scss'

interface ICommentCard {
  comment: IComment
  isPostOwner: boolean
  user?: IUser
}

export function CommentCard({ comment, user, isPostOwner }: ICommentCard) {
  const { deleted_at, created_at, deleted_by_owner, description } = comment

  const isCommentOwner = user?.id === comment.user?.id

  const deletedByMsg = deleted_by_owner ? 'pelo dono.' : 'pelo autor do Post.'
  if (deleted_at) {
    return (
      <Card className={s.deletedCard}>
        <p>Comentário deletado {deletedByMsg}</p>
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
                  rightSection={<PencilLine weight='bold' />}
                >
                  Editar
                </Menu.Item>

                <Menu.Divider />
              </>
            )}

            <Menu.Item color='red' rightSection={<Trash />}>
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
