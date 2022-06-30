import ThreadCreateForm from '@web/components/ThreadCreateForm'

import type { GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({}) => (
  <div>
    <ThreadCreateForm />
  </div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  }
}

export default function Create(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
