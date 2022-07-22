import { Box, Grid, Stack, Text, createStyles } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaListUl, FaPlus, FaThLarge, FaTools } from 'react-icons/fa'

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
  currentItemName,
  classes,
  cx,
}) => (
  <nav className={`${className}`}>
    <Grid>
      {NAVIGATIONS.map((navigation) => (
        <Grid.Col
          span={12 / NAVIGATIONS.length}
          key={navigation.href}
          className={cx(
            classes.item,
            navigation.name === currentItemName && classes.itemActive,
          )}
        >
          <Link href={navigation.href}>
            <Box component="a">
              <Stack spacing={0} align={'center'}>
                <navigation.icon size={24} />
                <Text size="xs">{navigation.name}</Text>
              </Stack>
            </Box>
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  </nav>
)

const Container = (props: ContainerProps) => {
  const { asPath } = useRouter()

  /**
   * 現在のパスからどのナビゲーションを選択しているかを判定する
   * 始まりが一致する -> 一番文字列が長いもの で絞り込み
   */
  const currentItemName = NAVIGATIONS.filter((navigation) =>
    asPath.startsWith(navigation.href),
  ).reduce((a, b) => (a.href?.length > b.href?.length ? a : b)).name

  const { classes, cx } = useStyles()

  const presenterProps = {
    currentItemName,
    classes,
    cx,
  }
  return { ...props, ...presenterProps }
}

const useStyles = createStyles((theme) => ({
  item: {
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    ':hover': {
      backgroundColor: theme.colors.gray?.[3],
    },
  },
  itemActive: {
    backgroundColor: theme.colors.gray?.[2],
  },
}))

export default function NavigationBottom(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
