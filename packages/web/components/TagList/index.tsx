import Tag from '@web/components/Tag'

import { TAG_GROUPS, TAG_ITEMS } from '@shared/constants/thread'

import {
  List,
  ListItem,
  ScrollArea,
  Text,
  Title,
  createStyles,
} from '@mantine/core'

import Link from 'next/link'
import React, { useCallback } from 'react'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  classes,
  tagsByGroup,
}) => (
  <List className={`${className}`} listStyleType={'none'}>
    {TAG_GROUPS.map((group) => (
      <List.Item key={group.slug} pt="lg">
        <Title order={3}>{group.label}</Title>
        <ScrollArea
          scrollbarSize={0}
          mx={-16}
          pt={8}
          offsetScrollbars
          type="always"
        >
          <List listStyleType={'none'} className={classes.tagList}>
            {tagsByGroup(group.slug).map((tag, i) => (
              <List.Item key={tag.slug}>
                <Link href={`/tags/${tag.slug}`}>
                  <Tag
                    label={tag.label}
                    icon={tag.icon}
                    className={classes.tag}
                    component="a"
                  />
                </Link>
              </List.Item>
            ))}
          </List>
        </ScrollArea>
      </List.Item>
    ))}
  </List>
)

const Container = (props: ContainerProps) => {
  /** Logic here */

  const { classes } = useStyles()

  // 指定のタググループに属するタグ一覧をフィルタ
  const tagsByGroup = useCallback((group: string) => {
    return TAG_ITEMS.filter((tag) => tag.group === group)
  }, [])

  const presenterProps = {
    classes,
    tagsByGroup,
  }
  return { ...props, ...presenterProps }
}

const useStyles = createStyles((theme) => ({
  tagList: {
    display: 'flex',
    ':last-child': {
      marginRight: 16,
    },
  },
  tag: {
    display: 'block',
    marginLeft: 16,
  },
}))

export default function TagList(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
