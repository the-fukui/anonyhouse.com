import ThreadControl from '@web/components/ThreadControl'
import ThreadEntranceScreen from '@web/components/ThreadEntranceScreen'
import ThreadUserList from '@web/components/ThreadUserList'
import { useGetThread } from '@web/hooks/useThread'
import { ThreadRepository } from '@web/repository/server/thread'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  thread,
  isEntered,
}) => (
  <div>
    <h1>{thread.title}</h1>
    <div>{JSON.stringify(thread.tags)}</div>
    <div>定員:{thread.capacity}人</div>
    {isEntered ? (
      <>
        <ThreadUserList />
        <ThreadControl />
      </>
    ) : (
      <ThreadEntranceScreen threadID={thread.ID} />
    )}
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  const { status: threadStatus } = useGetThread()
  const isEntered = threadStatus === 'ok'

  const presenterProps = {
    isEntered,
  }
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const threadID = Array.isArray(params?.threadID)
    ? params?.threadID[0]
    : params?.threadID

  if (!threadID) throw new Error('no threadID')

  try {
    const threadRepository = new ThreadRepository(threadID)
    const threadInfo = await threadRepository.getThread()

    return {
      props: {
        thread: { ID: threadID, ...threadInfo },
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

export default function ThreadId(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
