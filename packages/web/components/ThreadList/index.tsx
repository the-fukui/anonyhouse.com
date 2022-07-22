import {
  Box,
  Group,
  List,
  ListItem,
  Space,
  Text,
  createStyles,
} from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa'

type ContainerProps = {
  className?: string
  threads: {
    ID: string
    title: string
    capacity: number
    users: { avatar: string }[]
  }[]
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  threads,
  getAvatars,
  classes,
}) => (
  <List className={`${className}`} listStyleType={'none'}>
    {threads.map((thread, i) => (
      <ListItem key={thread.ID} className={classes.item}>
        <Link href={`/threads/${thread.ID}/`}>
          <Box component="a" className={classes.link} px={16} py={8}>
            <Text size="lg" weight="bold">
              {thread.title}
            </Text>
            <Group spacing={8}>
              <Text size="lg" lineClamp={5} className={classes.avatars}>
                {getAvatars(thread.users)}
              </Text>
              <FaUser size={15} />
              <Text size="sm" component={Group} spacing={4}>
                {thread.users.length || '0'}
                <Box>/</Box>
                {thread.capacity}
              </Text>
            </Group>
          </Box>
        </Link>
      </ListItem>
    ))}
  </List>
)

const Container = (props: ContainerProps) => {
  //参加者表示用アバター配列を取得
  const getAvatars = (users: { avatar: string }[]) => {
    return users.map((user) => user.avatar)
  }

  const { classes } = useStyles()

  const presenterProps = { getAvatars, classes }
  return { ...props, ...presenterProps }
}

const useStyles = createStyles((theme, _, getRef) => ({
  item: {
    [`:nth-child(even) .${getRef('link')}`]: {
      backgroundColor: theme.colors.gray?.[0],
    },
  },
  link: {
    ref: getRef('link'),
    cursor: 'pointer',
    display: 'block',
    backgroundColor: theme.colors.gray?.[1],
  },
  avatars: {
    flex: 1,
    ':empty': {
      ':after': {
        content: '" "',
        fontSize: 0,
        whiteSpace: 'pre',
      },
    },
  },
}))

export default function ThreadList(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
