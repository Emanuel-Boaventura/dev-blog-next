import { CommentCard } from '@/components/CommentCard'
import { RootLayout } from '@/layouts/RootLayout'
import { useProfile } from '@/services/auth/useProfile'
import { useGetAllPostComments } from '@/services/comments/useGetAllPostComments'
import { getPostById, IPostFullData } from '@/services/posts/getPostById'
import { useDeletePost } from '@/services/posts/useDeletePost'
import { dateFormatter } from '@/utils/formatters'
import { handleError } from '@/utils/handleError'
import { Button, Card, Center, Menu, Skeleton, Text } from '@mantine/core'
import { openConfirmModal, openContextModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import {
  DotsThreeOutlineVertical,
  PencilLine,
  Trash,
} from '@phosphor-icons/react'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { type ReactElement } from 'react'
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

interface IPostPage {
  post: IPostFullData
}

const Post: NextPageWithLayout<IPostPage> = ({ post }) => {
  const { data: user } = useProfile()
  const { trigger: deletePost, isMutating: isDeleting } = useDeletePost(post.id)
  const router = useRouter()
  const {
    data: comments,
    isLoading,
    error,
    mutate,
  } = useGetAllPostComments(post.id)

  const isPostOwner = user?.id === post.user.id

  function getImgName() {
    if (!post.image_url) return ''
    const stringArray = post.image_url.split('-')
    return stringArray[stringArray.length - 1].split('.')[0]
  }

  function openNewCommentModal() {
    openContextModal({
      modal: 'comment',
      title: 'Criar comentário',
      innerProps: { postId: post.id, refreshComments: mutate },
    })
  }

  async function handleDelete() {
    try {
      await deletePost()

      showNotification({
        title: 'Post deletado!',
        message: 'O post foi deletado com sucesso.',
        color: 'teal',
      })

      router.push('/home')
    } catch (error) {
      handleError(error)
    }
  }

  function openDeleteModal() {
    openConfirmModal({
      title: 'Deletar Post',
      centered: true,
      children: (
        <Text size='sm'>
          Tem certeza que deseja deletar este post? Esta ação não pode ser
          desfeita.
        </Text>
      ),
      labels: { confirm: 'Delete ', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    })
  }

  return (
    <Card className={s.card}>
      {isPostOwner && (
        <Menu shadow='md' position='bottom-end'>
          <Menu.Target>
            <Button color='dark' variant='transparent' className={s.edit}>
              <DotsThreeOutlineVertical weight='duotone' size={20} />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              href={`/posts/edit/${post.id}`}
              color='blue'
              rightSection={<PencilLine weight='bold' />}
            >
              Editar
            </Menu.Item>

            <Menu.Divider />

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

      <h1>{post.title}</h1>
      <p className={s.date}>
        Autor: {post.user.name} | Postado em: {dateFormatter(post.created_at)}
      </p>
      <p className={s.description}>{post.description}</p>

      {post.image_url && (
        <figure className={s.img}>
          {post.image_url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${post.image_url}`}
              width={480}
              height={480}
              objectFit='cover'
              alt={post.title}
            />
          )}
          <figcaption>Foto: {getImgName()}</figcaption>
        </figure>
      )}

      <section className={s.commentsSection}>
        <h2>Comentários:</h2>

        <div className={s.comments}>
          <Button variant='outline' onClick={openNewCommentModal}>
            Comentar
          </Button>
          {isLoading ? (
            <>
              <Skeleton height={120} radius={12} />
              <Skeleton height={120} radius={12} />
              <Skeleton height={120} radius={12} />
            </>
          ) : comments?.length === 0 ? (
            <Center>Nenhum comentário ainda...</Center>
          ) : (
            comments
              ?.sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime(),
              )
              .map(comment => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  user={user}
                  isPostOwner={isPostOwner}
                  refreshComments={mutate}
                />
              ))
          )}

          {error && (
            <Center>Não foi possível carregar os comentários...</Center>
          )}
        </div>
      </section>
    </Card>
  )
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default Post
