import EmojiPicker from '@web/components/EmojiPicker'
import { useGlobalThread } from '@web/hooks/useGlobalThread'
import { useGlobalUser } from '@web/hooks/useGlobalUser'
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
  setAvatar,
}) => (
  <div className={`${className}`}>
    Mute:<button onClick={toggleMute}>{isMuted ? 'off' : 'on'}</button>
    <EmojiPicker onSelect={setAvatar} />
  </div>
)

const Container = (props: ContainerProps) => {
  const { isMuted, status, toggleMute } = useGlobalUserMedia()
  const { setAvatar } = useGlobalUser()

  const presenterProps = {
    isMuted,
    toggleMute,
    setAvatar,
  }
  return { ...props, ...presenterProps }
}

export default function userControl(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
