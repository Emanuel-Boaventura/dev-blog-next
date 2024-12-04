import { RootLayout } from '@/layouts/RootLayout'
import { IPost, useGetAllPosts } from '@/services/posts/useGetAll'
import { Button, Center, Skeleton } from '@mantine/core'
import Link from 'next/link'
import { type ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import s from './styles.module.scss'

const Home: NextPageWithLayout = () => {
  const { data, isLoading, error } = useGetAllPosts()

  function PostCard({ data }: { data: IPost }) {
    return (
      <div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
    )
  }

  if (error) return <Center>Erro ao carregar os posts</Center>

  return (
    <div className={s.content}>
      {isLoading ? (
        <>
          <Skeleton height={200} radius={12} />
          <Skeleton height={200} radius={12} />
          <Skeleton height={200} radius={12} />
        </>
      ) : (
        data?.map(post => <PostCard data={post} />)
      )}

      <Button component={Link} href='new-post'>
        Novo post
      </Button>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default Home
