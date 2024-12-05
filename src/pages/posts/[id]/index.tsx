import { CommentCard } from '@/components/HomePostCard copy'
import { RootLayout } from '@/layouts/RootLayout'
import me from '@/public/assets/me.jpg'
import { useProfile } from '@/services/auth/useProfile'
import { getPostById, IPostFullData } from '@/services/posts/getPostById'
import { dateFormatter } from '@/utils/formatters'
import { Button, Card, Center } from '@mantine/core'
import { PencilLine } from '@phosphor-icons/react'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
  function getImgName() {
    if (!post.image_url) return ''
    const stringArray = post.image_url.split('-')
    return stringArray[stringArray.length - 1].split('.')[0]
  }

  const { data: user } = useProfile()

  const isPostOwner = user?.id === post.user.id

  return (
    <Card className={s.card}>
      {user?.id === post.user.id && (
        <Button
          component={Link}
          href={`/posts/edit/${post.id}`}
          color='blue'
          className={s.edit}
        >
          <PencilLine weight='duotone' size={20} />
        </Button>
      )}
      <h1>{post.title}</h1>
      <p className={s.date}>
        Autor: {post.user.name} | Postado em: {dateFormatter(post.created_at)}
      </p>
      <p className={s.description}>{post.description}</p>

      {post.image_url && (
        <figure className={s.img}>
          {/* {data.image_url && <Image src={data.image_url} alt={data.title} />} */}
          {post.image_url && <Image src={me} alt={post.title} />}
          <figcaption>Foto: {getImgName()}</figcaption>
        </figure>
      )}

      <section className={s.commentsSection}>
        <h2>Comentários:</h2>

        <div className={s.comments}>
          <Button variant='outline'>Comentar</Button>

          {post.comments.length === 0 ? (
            <Center>Nenhum comentário ainda...</Center>
          ) : (
            post.comments
              .sort(
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
                />
              ))
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
