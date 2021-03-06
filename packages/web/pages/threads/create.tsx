import ThreadCreateForm from '@web/components/ThreadCreateForm'

import { Container as PageContainer, Text, Title } from '@mantine/core'

import type { GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({}) => (
  <PageContainer fluid px={16}>
    <Title order={2} align="center" my="42px">
      スレッドを作成
    </Title>
    <ThreadCreateForm />
  </PageContainer>
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
