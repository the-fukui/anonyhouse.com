import { ThreadRepository } from '@web/repository/server/thread'

import type { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({ threads }) => (
  <div>
    <ul>
      {threads.map((thread) => (
        <li key={thread.ID}>
          <Link href={`/threads/${thread.ID}/`}>
            <a>
              {thread.title},{thread.capacity}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  try {
    const threads = await ThreadRepository.getThreadList().catch((e) =>
      console.log(e),
    )

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
