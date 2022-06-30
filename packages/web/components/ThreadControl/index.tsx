import { useLoadingScreen } from '@web/hooks/useLoadingScreen'
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
  onExit,
}) => (
  <div className={`${className}`}>
    Mute:<button onClick={toggleMute}>{isMuted ? 'off' : 'on'}</button>
    <button onClick={onExit}>退室</button>
  </div>
)

const Container = (props: ContainerProps) => {
  const { isMuted, toggleMute } = useUserMedia()
  const { enableLoading } = useLoadingScreen()

  const onExit = async () => {
    enableLoading()
    !isMuted && toggleMute()
    window.location.reload()
  }

  const presenterProps = {
    isMuted,
    toggleMute,
    onExit,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadControl(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
