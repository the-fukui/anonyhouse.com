import { Box, Grid } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { FaListUl, FaPlus, FaThLarge, FaTools } from 'react-icons/fa'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const NAVIGATIONS = [
  { name: 'スレッド', href: '/', icon: FaListUl },
  { name: 'カテゴリ一覧', href: '/categories', icon: FaThLarge },
  { name: 'スレッド作成', href: '/threads/create', icon: FaPlus },
  { name: '設定', href: '/setting', icon: FaTools },
]

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
}) => (
  <nav className={`${className}`}>
    <Grid>
      {NAVIGATIONS.map((navigation) => (
        <Grid.Col span={12 / NAVIGATIONS.length} key={navigation.href}>
          <Link href={navigation.href}>
            <Box sx={() => ({ cursor: 'pointer' })} component="a">
              <navigation.icon size={24} />
              {navigation.name}
            </Box>
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  </nav>
)

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

export default function NavigationBottom(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
