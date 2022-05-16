import type { AppProps } from 'next/app'
import React from 'react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  )
}

export default MyApp
