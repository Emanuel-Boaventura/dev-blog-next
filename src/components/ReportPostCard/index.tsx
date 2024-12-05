import { IPostReport } from '@/services/posts/useGetAllUserPosts'
import { dateFormatter } from '@/utils/formatters'
import { Card, Divider } from '@mantine/core'
import Link from 'next/link'
import s from './styles.module.scss'

export function ReportPostCard({ data }: { data: IPostReport }) {
  return (
    <Card component={Link} href={`/posts/${data.id}`} className={s.card}>
      <h2>Post: {data.title}</h2>

      <div className={s.text}>
        <p className={s.date}>Postado em: {dateFormatter(data.created_at)}</p>

        <Divider orientation='vertical' size='md' className={s.divider} />

        <p>Comentários: {data.comments_quantity}</p>
      </div>
    </Card>
  )
}
