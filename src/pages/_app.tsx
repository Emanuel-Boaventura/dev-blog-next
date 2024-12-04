import { RouterTransition } from '@/components/RouterTransition'
import '@/styles/globals.scss'
import { theme } from '@/styles/theme'
import { api } from '@/utils/api'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import '@mantine/nprogress/styles.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr/_internal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DevBlog</title>
      </Head>

      <SWRConfig value={{ fetcher: async config => (await api(config)).data }}>
        <MantineProvider theme={theme}>
          <Notifications />
          <RouterTransition />
          <ModalsProvider
            modalProps={{
              withCloseButton: false,
              padding: 0,
              centered: true,
              radius: 8,
            }}
          >
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </SWRConfig>
    </>
  )
}
