import { useUserMedia } from '@web/hooks/useUserMedia'

import React, { useEffect } from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  isMuted,
  toggleMute,
}) => (
  <div className={`${className}`}>
    Mute:<button onClick={toggleMute}>{isMuted ? 'off' : 'on'}</button>
  </div>
)

const Container = (props: ContainerProps) => {
  const { isMuted, toggleMute } = useUserMedia()

  const presenterProps = {
    isMuted,
    toggleMute,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadControl(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
