import ThreadEntranceScreen from '@web/components/ThreadEntranceScreen'
import ThreadUserList from '@web/components/ThreadUserList'
import UserControl from '@web/components/UserControl'
import { useGlobalThread } from '@web/hooks/useGlobalThread'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  threadStatus,
}) => (
  <div>
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
  const { status: threadStatus } = useGlobalThread()

  const presenterProps = {
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
