---
name: '[@web] component'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter component name.'
---

# `packages/web/components/{{ inputs.name | pascal }}/index.tsx`

```tsx
import { createStyles } from '@mantine/core'
import React from 'react'

type ContainerProps = {
    className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({className}) => (
  <div className={`${className}`}></div>
)

const Container = (props: ContainerProps) => {
  /** Logic here */

  // const { classes } = useStyles()

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const useStyles = createStyles((theme) => ({}))

export default function {{ inputs.name | pascal }}(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
```

<!--
# `packages/web/components/{{ inputs.name | pascal }}/index.scss`

```scss

``` -->
