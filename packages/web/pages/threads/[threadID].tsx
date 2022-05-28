import UserControl from '@web/components/UserControl'
import { useGlobalThread } from '@web/hooks/useGlobalThread'
import { useGlobalUserMedia } from '@web/hooks/useGlobalUserMedia'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  onInitialConnect,
  users,
  state,
  myID,
}) => (
  <div>
    <UserControl />
    <button disabled={state !== 'ok'} onClick={onInitialConnect}>
      initialConnect
    </button>
    <ul>
      {users.map((user) => (
        <li key={user.ID}>
          {user.ID} | {new Date(user.timestamp).toLocaleString()}{' '}
          {user.ID === myID && '(you)'}
        </li>
      ))}
    </ul>
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  const { threadID } = props

  const { stream, state } = useGlobalUserMedia()
  const { initialConnect, users, myID } = useGlobalThread({
    threadID,
    myStream: stream,
  })

  const onInitialConnect = () => {
    initialConnect()
  }

  const presenterProps = {
    onInitialConnect,
    users,
    state,
    myID,
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
