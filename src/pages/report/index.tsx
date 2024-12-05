import { ReportPostCard } from '@/components/ReportPostCard'
import { RootLayout } from '@/layouts/RootLayout'
import { useProfile } from '@/services/auth/useProfile'
import { useGetAllUserPosts } from '@/services/posts/useGetAllUserPosts'
import { Center, Skeleton } from '@mantine/core'
import { type ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import s from './styles.module.scss'

const Report: NextPageWithLayout = () => {
  const { data: user } = useProfile()
  const { data, isLoading, error } = useGetAllUserPosts(user?.id)

  if (error) return <Center>Erro ao carregar os posts</Center>

  const sortedPosts = data?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )

  return (
    <div className={s.content}>
      {(!data && !error) || isLoading ? (
        <>
          <Skeleton height={200} radius={12} />
          <Skeleton height={200} radius={12} />
          <Skeleton height={200} radius={12} />
        </>
      ) : (
        sortedPosts?.map(post => <ReportPostCard key={post.id} data={post} />)
      )}
    </div>
  )
}

Report.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default Report
