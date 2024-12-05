import { CommentModal } from '@/components/CommentModal'
import { RouterTransition } from '@/components/RouterTransition'
import '@/styles/globals.scss'
import { theme } from '@/styles/theme'
import { api } from '@/utils/api'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import '@mantine/nprogress/styles.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr/_internal'

const modals = {
  comment: CommentModal,
}
declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof modals
  }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <>
      <Head>
        <title>DevBlog</title>
      </Head>

      <SWRConfig value={{ fetcher: async config => (await api(config)).data }}>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          <ModalsProvider
            modals={modals}
            modalProps={{ centered: true, radius: 8 }}
          >
            <Notifications />
            <RouterTransition />
            {getLayout(<Component {...pageProps} />)}
          </ModalsProvider>
        </MantineProvider>
      </SWRConfig>
    </>
  )
}
