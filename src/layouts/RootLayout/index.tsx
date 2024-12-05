import logo from '@/public/assets/logo.png'
import { useProfile } from '@/services/auth/useProfile'
import { AppShell, Avatar, Button, Menu } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { ChartLine, Gear, SignOut } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import s from './styles.module.scss'

export function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data } = useProfile()

  function handleSignOut() {
    destroyCookie(null, 'dev-blog-userToken')

    showNotification({
      title: 'Você saiu com sucesso!',
      message: `Esperaremos ansiosamente pela sua volta!`,
      color: 'teal',
    })

    router.push('/login')
  }
  return (
    <AppShell
      header={{ height: 60 }}
      padding='md'
      classNames={{ header: s.header, main: s.main }}
    >
      <AppShell.Header>
        <div className={s.headerContent}>
          <Link href='/'>
            <Image src={logo} className={s.logo} alt='DevBlog Logo' />
          </Link>

          <Menu shadow='md' width={160}>
            <Menu.Target>
              <Button
                variant='transparent'
                classNames={{ root: s.button, label: s.label }}
              >
                <p>{data?.name || '...'}</p>

                <Avatar
                  // src='/avatar.png'
                  alt='Minha foto'
                  classNames={{ root: s.avatar }}
                >
                  {data?.name.split('')[0]}
                </Avatar>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                href={'/settings'}
                leftSection={<Gear />}
              >
                Configurações
              </Menu.Item>
              <Menu.Item
                component={Link}
                href={'/report'}
                leftSection={<ChartLine />}
              >
                Relatório
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                onClick={handleSignOut}
                color='red'
                leftSection={<SignOut />}
              >
                Sair
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
