import Tag from '@web/components/Tag'

import {
  Avatar,
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
    tags: {
      slug: string
      label: string
      icon: string
      group: string
    }[]
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
      <List.Item key={thread.ID} className={classes.item}>
        <Link href={`/threads/${thread.ID}/`}>
          <Box component="a" className={classes.link} px={16} py={8}>
            <Text size="lg" weight="bold">
              {thread.title}
            </Text>
            <Group spacing={8}>
              {/* <List listStyleType={'none'}>
                {thread.tags.map((tag) => (
                  <List.Item key={tag.slug}>
                    <Tag
                      key={tag.slug}
                      label={tag.label}
                      icon={tag.icon}
                      size="sm"
                    />
                  </List.Item>
                ))}
              </List> */}
              <Avatar.Group className={classes.avatars} spacing={8}>
                {getAvatars(thread.users).map((avatar, i) => (
                  <Avatar key={i} radius="xl" size="sm">
                    <Text size="xl">{avatar}</Text>
                  </Avatar>
                ))}
                {thread.users.length > 10 && (
                  <Avatar key={i} radius="xl" size="sm">
                    <Text size="sm">+{thread.users.length - 10}</Text>
                  </Avatar>
                )}
              </Avatar.Group>
              <FaUser size={15} />
              <Text size="sm" component={Group} spacing={4}>
                {thread.users.length || '0'}
                <Box>/</Box>
                {thread.capacity}
              </Text>
            </Group>
          </Box>
        </Link>
      </List.Item>
    ))}
  </List>
)

const Container = (props: ContainerProps) => {
  //参加者表示用アバター配列を取得
  const getAvatars = (users: { avatar: string }[]) => {
    // return users.map((user) => user.avatar)
    return ['😇', '😭', '👨‍👩‍👦', '👨‍👨‍👦‍👦', '🚭', '🏄🏼‍♀️']
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
    textAlign: 'right',
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
