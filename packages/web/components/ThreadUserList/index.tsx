import { useThreadStateValue } from '@web/state/thread'

import React from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  users,
  myID,
}) => (
  <div className={`${className}`}>
    <ul>
      {users.map((user) => (
        <li key={user.ID}>
          {user.avatar} {user.ID} | {new Date(user.timestamp).toLocaleString()}{' '}
          {user.ID === myID && '(you)'}
        </li>
      ))}
    </ul>
  </div>
)

const Container = (props: ContainerProps) => {
  const users = useThreadStateValue('users')
  const myID = useThreadStateValue('myID')

  const presenterProps = {
    users,
    myID,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadUserList(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
