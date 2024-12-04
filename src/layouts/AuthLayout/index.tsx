import logo from '@/public/assets/logo.png'
import { Button } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import s from './styles.module.scss'

interface IAuthLayout {
  children: React.ReactNode
  title: string
  buttonText: string
  redirect: string
  redirectText: string
  onSubmit: () => void
  isLoading: boolean
}

export default function AuthLayout({
  children,
  title,
  buttonText,
  onSubmit,
  redirect,
  redirectText,
  isLoading,
}: IAuthLayout) {
  return (
    <div className={s.page}>
      <form onSubmit={onSubmit} className={s.container}>
        <div className={s.header}>
          <Image src={logo} alt='DevBlog Logo' />
          <h1>DevBlog</h1>

          <p>{title}</p>
        </div>

        {children}

        <Button type='submit' loading={isLoading} disabled={isLoading}>
          {buttonText}
        </Button>

        <Button
          href={redirect}
          component={Link}
          type='submit'
          variant='transparent'
        >
          {redirectText}
        </Button>
      </form>
    </div>
  )
}
