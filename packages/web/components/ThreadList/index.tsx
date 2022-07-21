import { Box, Group, List, ListItem, Space, Text } from '@mantine/core'
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
}) => (
  <List className={`${className}`} listStyleType={'none'}>
    {threads.map((thread, i) => (
      <ListItem key={thread.ID}>
        <Link href={`/threads/${thread.ID}/`}>
          <Box
            component="a"
            sx={(theme) => ({
              cursor: 'pointer',
              display: 'block',
              backgroundColor:
                i % 2 == 0 ? theme.colors.gray?.[1] : theme.colors.gray?.[0],
            })}
            px={16}
            py={8}
          >
            <Text size="lg" weight="bold">
              {thread.title}
            </Text>
            <Group spacing={8}>
              <Text
                size="lg"
                lineClamp={5}
                sx={() => ({
                  flex: 1,
                  ':empty': {
                    ':after': {
                      content: '" "',
                      fontSize: 0,
                      whiteSpace: 'pre',
                    },
                  },
                })}
              >
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
  const getAvatars = (users: { avatar: string }[]) => {
    return users.map((user) => user.avatar)
  }

  const presenterProps = { getAvatars }
  return { ...props, ...presenterProps }
}

export default function ThreadList(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
