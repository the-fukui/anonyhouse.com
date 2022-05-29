import UserControl from '@web/components/UserControl'
import { useGlobalThread } from '@web/hooks/useGlobalThread'
import { useGlobalUser } from '@web/hooks/useGlobalUser'
import { useGlobalUserMedia } from '@web/hooks/useGlobalUserMedia'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React, { useEffect } from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  initialConnect,
  users,
  myStreamStatus,
  myID,
  myAvatar,
}) => (
  <div>
    <UserControl />
    <button
      disabled={myStreamStatus !== 'ok' || !Boolean(myAvatar)}
      onClick={initialConnect}
    >
      initialConnect
    </button>
    <ul>
      {users.map((user) => (
        <li key={user.ID}>
          {user.avatar} {user.ID} | {new Date(user.timestamp).toLocaleString()}{' '}
          {user.ID === myID && '(you)'}
        </li>
      ))}
    </ul>
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  const { threadID } = props

  const { stream: myStream, status: myStreamStatus } = useGlobalUserMedia()
  const { avatar: myAvatar } = useGlobalUser()
  const { initialConnect, users, myID } = useGlobalThread({
    threadID,
    myStream,
    myAvatar,
  })

  const presenterProps = {
    initialConnect,
    users,
    myStreamStatus,
    myID,
    myAvatar,
  }
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const threadID = Array.isArray(params?.threadID)
    ? params?.threadID[0]
    : params?.threadID
  if (!threadID) throw new Error('no thread ID')

  return {
    props: {
      threadID,
    },
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
