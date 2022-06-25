import EmojiPicker from '@web/components/EmojiPicker'
import { useThread } from '@web/hooks/useThread'
import { useUserMedia } from '@web/hooks/useUserMedia'

import React, { useEffect, useRef, useState } from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  threadID: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  setMyAvatar,
  isEnterButtonDisabled,
  onEnter,
}) => (
  <div className={`${className}`}>
    <EmojiPicker onSelect={setMyAvatar} />
    <button onClick={onEnter} disabled={isEnterButtonDisabled}>
      initialConnect
    </button>
  </div>
)

const Container = (props: ContainerProps) => {
  const { threadID } = props

  //avatar
  const [myAvatar, setMyAvatar] = useState<string>()

  //userMedia
  const { stream: myStream, status: myStreamStatus } = useUserMedia()

  //thread
  const { initialConnect, status: threadStatus } = useThread()

  const isEnterButtonDisabled =
    myStreamStatus !== 'ok' ||
    !Boolean(myAvatar) ||
    ['ok', 'pending'].includes(threadStatus)

  const onEnter = () =>
    myStream && myAvatar && initialConnect({ threadID, myStream, myAvatar })

  const presenterProps = {
    setMyAvatar,
    isEnterButtonDisabled,
    onEnter,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadEntranceScreen(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
