import LoadingScreen from '@web/components/LoadingScreen'
import NavigationBottom from '@web/components/NavigationBottom'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <ModalsProvider>
          <NotificationsProvider>
            <RecoilRoot>
              <Component {...pageProps} />
              <NavigationBottom />
              <div id="modal"></div>
              <LoadingScreen />
            </RecoilRoot>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </React.StrictMode>
  )
}

export default MyApp
