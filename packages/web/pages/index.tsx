import ThreadList from '@web/components/ThreadList'
import { ThreadRepository } from '@web/repository/thread'

import type { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({ threads }) => (
  <div>
    <ThreadList threads={threads} />
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const threads = await ThreadRepository.getThreadList()

    return {
      props: {
        threads,
      },
      revalidate: 60,
    }
  } catch {
    return {
      notFound: true,
    } as const
  }
}

export default function Index(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
