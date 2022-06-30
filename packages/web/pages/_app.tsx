import LoadingScreen from '@web/components/LoadingScreen'

import type { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <Component {...pageProps} />
        <div id="modal"></div>
        <LoadingScreen />
      </RecoilRoot>
    </React.StrictMode>
  )
}

export default MyApp
