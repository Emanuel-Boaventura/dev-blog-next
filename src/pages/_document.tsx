import { ColorSchemeScript } from '@mantine/core'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <ColorSchemeScript defaultColorScheme='dark' />

        <meta property='og:locale' content='pt_BR' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='DevBlog' />
        <meta
          property='og:description'
          content='Publique as descobertas que teve como desenvolvedor.'
        />
        <meta property='og:url' content='https://' />
        <meta property='og:site_name' content='DevBlog' />
        <meta
          name='description'
          content='Publique as descobertas que teve como desenvolvedor.'
        />

        <meta property='og:image' itemProp='image' content='https://' />
        <meta property='og:image:width' content='260' />
        <meta property='og:image:height' content='260' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:alt' content='DevBlog' />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
