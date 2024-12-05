import { HomePostCard } from '@/components/Posts/HomePostCard'
import { RootLayout } from '@/layouts/RootLayout'
import { useGetAllPosts } from '@/services/posts/useGetAll'
import { Button, Center, Skeleton } from '@mantine/core'
import Link from 'next/link'
import { type ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import s from './styles.module.scss'

const Home: NextPageWithLayout = () => {
  const { data, isLoading, error } = useGetAllPosts()

  if (error) return <Center>Erro ao carregar os posts</Center>

  const sortedPosts = data?.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )

  return (
    <div className={s.content}>
      {isLoading ? (
        <>
          <Skeleton height={200} radius={12} />
          <Skeleton height={200} radius={12} />
          <Skeleton height={200} radius={12} />
        </>
      ) : (
        sortedPosts?.map(post => <HomePostCard key={post.id} data={post} />)
      )}

      <Button component={Link} href='posts/new'>
        Novo post
      </Button>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default Home
