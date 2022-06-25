import ThreadEntranceScreen from '@web/components/ThreadEntranceScreen'
import { useGetThread } from '@web/hooks/useThread'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  threadID,
  isEntered,
}) => (
  <div>
    {isEntered ? <div></div> : <ThreadEntranceScreen threadID={threadID} />}
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
