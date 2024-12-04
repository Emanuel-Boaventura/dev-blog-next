import { createTheme } from '@mantine/core'
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({ subsets: ['latin'] })

export const theme = createTheme({
  fontFamily: nunitoSans.style.fontFamily,
})
