import { useGlobalUserMedia } from '@web/hooks/useGlobalUserMedia'

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
  const { isMuted, toggleMute } = useGlobalUserMedia()

  const presenterProps = {
    isMuted,
    toggleMute,
  }
  return { ...props, ...presenterProps }
}

export default function UserControl(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
