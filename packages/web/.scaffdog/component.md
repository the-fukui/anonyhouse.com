---
name: 'component'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter component name.'
---

# `components/{{ inputs.name | pascal }}/index.tsx`

```tsx
import React from 'react'
import style from './index.module.scss'

type ContainerProps = {
    className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({className}) => (
  <div className={`${className}`}></div>
)

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

export default function {{ inputs.name | pascal }}(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
```

# `components/{{ inputs.name | pascal }}/index.scss`

```scss

```
