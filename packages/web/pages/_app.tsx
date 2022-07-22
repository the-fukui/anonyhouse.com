import Header from '@web/components/Header'
import LoadingScreen from '@web/components/LoadingScreen'
import NavigationBottom from '@web/components/NavigationBottom'

import {
  Affix,
  Box,
  Global,
  MantineProvider,
  Stack,
  createStyles,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

import type { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  const { classes } = useStyles()

  return (
    <React.StrictMode>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          colors: {
            background: ['#F4F5F7'],
          },
          primaryColor: 'gray',
        }}
      >
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor: theme.colors.background?.[0],
            },
          })}
        />
        <ModalsProvider>
          <NotificationsProvider>
            <RecoilRoot>
              <Stack spacing={0} className={classes.stack}>
                <Header />
                <Box className={classes.main} component="main">
                  <Component {...pageProps} />
                </Box>
                <Box className={classes.navigation}>
                  <NavigationBottom />
                </Box>
              </Stack>
              <LoadingScreen />
            </RecoilRoot>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </React.StrictMode>
  )
}

const useStyles = createStyles((theme) => ({
  stack: {
    height: ['100vh', '100dvh'],
  },
  main: { flex: 1, height: '100%', position: 'relative' },
  navigation: {
    position: 'relative',
    zIndex: 1,
  },
}))

export default MyApp
