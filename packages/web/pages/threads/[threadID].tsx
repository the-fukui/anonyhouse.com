import { useThread } from '@web/hooks/useThread'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  onInitialConnect,
}) => (
  <div>
    <button onClick={onInitialConnect}>initialConnect</button>
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  const { initialConnect } = useThread()

  const onInitialConnect = () => {
    initialConnect()
  }

  const presenterProps = {
    onInitialConnect,
  }
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
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
