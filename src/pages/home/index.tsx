import { RootLayout } from '@/layouts/RootLayout'
import type { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const Home: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default Home
