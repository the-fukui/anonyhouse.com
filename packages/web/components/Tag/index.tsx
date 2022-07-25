import {
  Button,
  MantineSize,
  MantineStyleSystemProps,
  Text,
  createStyles,
} from '@mantine/core'

import React from 'react'

interface ContainerProps extends MantineStyleSystemProps {
  className?: string
  label: string
  icon: string
  size?: 'sm' | 'lg'
  component?: 'button' | 'a' | 'div'
}

const iconSize = {
  sm: 'xs',
  lg: 'md',
} as const

const textSize = {
  sm: 'xxs',
  lg: 'sm',
} as const

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  label,
  icon,
  size = 'lg',
  classes,
  ...componentProps
}) => (
  <Button
    className={`${className} ${size === 'sm' && classes.sm}`}
    leftIcon={
      size === 'lg' && <Text size={iconSize[size] as MantineSize}>{icon}</Text>
    }
    compact
    {...componentProps}
  >
    <Text size={textSize[size] as MantineSize}>{label}</Text>
  </Button>
)

const Container = (props: ContainerProps) => {
  /** Logic here */

  const { classes } = useStyles()

  const presenterProps = {
    classes,
  }
  return { ...props, ...presenterProps }
}

const useStyles = createStyles(() => ({
  sm: {
    padding: 0,
  },
}))

export default function Tag(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
