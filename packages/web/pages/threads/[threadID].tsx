import ThreadEntranceScreen from '@web/components/ThreadEntranceScreen'
import ThreadUserList from '@web/components/ThreadUserList'
import UserControl from '@web/components/UserControl'
import { useThread } from '@web/hooks/useThread'
import { useSetThreadState, useThreadStateValue } from '@web/state/thread'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React, { useEffect } from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  threadStatus,
  myAvatar,
  status,
}) => (
  <div>
    <div>myavatar:{myAvatar}</div>
    <div>status:{status}</div>
    {['error', 'initial', 'pending'].includes(threadStatus) ? (
      <ThreadEntranceScreen />
    ) : (
      <>
        <ThreadUserList />
        <UserControl />
      </>
    )}
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  //thread
  const {
    status: threadStatus,
    users: threadUsers,
    initialConnect,
  } = useThread()
  const setStatus = useSetThreadState('status')
  const setUsers = useSetThreadState('users')
  const setInitialConnect = useSetThreadState('initialConnect')

  useEffect(() => {
    setStatus(threadStatus)
    setUsers(threadUsers)
    setInitialConnect(initialConnect)
  }, [threadStatus, threadUsers, initialConnect])

  const myAvatar = useThreadStateValue('myAvatar')
  const status = useThreadStateValue('status')

  const presenterProps = {
    myAvatar,
    status,
    threadStatus,
  }
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default function ThreadId(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
