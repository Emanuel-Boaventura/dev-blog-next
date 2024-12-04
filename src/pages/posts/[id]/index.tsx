import { RootLayout } from '@/layouts/RootLayout'
import { getPostById, IPostFullData } from '@/services/posts/getPostById'
import { Card } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import { type ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

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
  return (
    <Card>
      <h1>{post.title}</h1>
      <p>{post.description}</p>

      <h2>Comentários:</h2>

      <div>
        {post.comments.map(comment => (
          <p key={comment.id}>{comment.description}</p>
        ))}
      </div>
    </Card>
  )
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default Post
