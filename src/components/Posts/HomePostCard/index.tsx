import logo from '@/public/assets/me.jpg'
import { IPost } from '@/services/posts/useGetAll'
import { dateFormatter } from '@/utils/formatters'
import { Card } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import s from './styles.module.scss'

export function HomePostCard({ data }: { data: IPost }) {
  return (
    <Card component={Link} href={`/posts/${data.id}`} className={s.card}>
      <div className={s.text}>
        <h2>{data.title}</h2>
        <p>{data.description}</p>

        <p className={s.date}>Postado em: {dateFormatter(data.created_at)}</p>
      </div>

      {/* {data.image_url && <Image src={data.image_url} alt={data.title} />} */}
      {data.image_url && <Image src={logo} alt={data.title} />}
    </Card>
  )
}
