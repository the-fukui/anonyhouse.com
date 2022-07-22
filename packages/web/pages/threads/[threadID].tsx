import ThreadControl from '@web/components/ThreadControl'
import ThreadEntranceScreen from '@web/components/ThreadEntranceScreen'
import ThreadUserList from '@web/components/ThreadUserList'
import { useGetThread } from '@web/hooks/useThread'
import { ThreadRepository } from '@web/repository/thread'

import { Affix, Box, Stack, createStyles } from '@mantine/core'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  thread,
  isEntered,
  classes,
}) => (
  <Stack justify={'flex-end'} className={classes.stack}>
    <h1>{thread.title}</h1>
    <div>{JSON.stringify(thread.tags)}</div>
    <div>定員:{thread.capacity}人</div>
    {isEntered ? (
      <>
        <ThreadUserList />
        <ThreadControl />
      </>
    ) : (
      <Box className={classes.entranceScreen}>
        <ThreadEntranceScreen threadID={thread.ID} />
      </Box>
    )}
  </Stack>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  const { status: threadStatus } = useGetThread()
  const isEntered = threadStatus === 'ok'

  const { classes } = useStyles()

  const presenterProps = {
    isEntered,
    classes,
  }
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const threadID = Array.isArray(params?.threadID)
    ? params?.threadID[0]
    : params?.threadID

  if (!threadID) throw new Error('no threadID')

  try {
    const threadInfo = await ThreadRepository.getThread(threadID)

    return {
      props: {
        thread: { ...threadInfo },
      },
      revalidate: 60,
    }
  } catch {
    return {
      notFound: true,
    } as const
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const useStyles = createStyles((theme) => ({
  stack: {
    height: '100%',
  },
  entranceScreen: {
    boxShadow: theme.shadows.xl,
    backgroundColor: 'white',
  },
}))

export default function ThreadId(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
