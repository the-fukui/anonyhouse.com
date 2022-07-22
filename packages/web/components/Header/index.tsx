import Logo from '@web/components/svg/logo.svg'

import { Box, Center, createStyles } from '@mantine/core'

import Link from 'next/link'
import React from 'react'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  classes,
}) => (
  <Center className={classes.wrapper} py={0}>
    <Link href={'/'}>
      <Box className={classes.link} component="a" py={16}>
        <Logo />
      </Box>
    </Link>
  </Center>
)

const Container = (props: ContainerProps) => {
  /** Logic here */

  const { classes } = useStyles()

  const presenterProps = {
    classes,
  }
  return { ...props, ...presenterProps }
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderBottom: '1px solid',
    borderColor: theme.colors.dark?.[0],
    backgroundColor: 'white',
  },
  link: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
}))

export default function Header(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
