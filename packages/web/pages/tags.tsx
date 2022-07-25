import TagList from '@web/components/TagList'

import { Container as PageContainer, Text, Title } from '@mantine/core'

import type { GetStaticPropsContext } from 'next'
import React from 'react'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({}) => (
  <PageContainer px={16}>
    <Title order={2} align="center" my="42px">
      タグ一覧
    </Title>
    <TagList />
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

  // return {
  //   notFound:true
  // } as const
}

export default function Categories(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
