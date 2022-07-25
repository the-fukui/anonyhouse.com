import {
  Button,
  MantineStyleSystemProps,
  Text,
  createStyles,
} from '@mantine/core'

import React, { ComponentProps } from 'react'

interface ContainerProps extends MantineStyleSystemProps {
  className?: string
  label: string
  icon: string
  component?: 'button' | 'a' | 'div'
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  label,
  icon,
  ...componentProps
}) => (
  <Button
    className={`${className}`}
    leftIcon={<Text size="md">{icon}</Text>}
    compact
    {...componentProps}
  >
    {label}
  </Button>
)

const Container = (props: ContainerProps) => {
  /** Logic here */

  // const { classes } = useStyles()

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const useStyles = createStyles((theme) => ({}))

export default function Tag(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
