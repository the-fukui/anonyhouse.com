import EmojiPicker from '@web/components/EmojiPicker'
import { useGlobalThread } from '@web/hooks/useGlobalThread'
import { useGlobalUserMedia } from '@web/hooks/useGlobalUserMedia'
import { useMyAvatar, useSetMyAvatar } from '@web/state/thread'

import { useRouter } from 'next/router'
import React from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  setMyAvatar,
  myAvatar,
  myStreamStatus,
  onInitialConnect,
  threadStatus,
}) => (
  <div className={`${className}`}>
    <EmojiPicker onSelect={setMyAvatar} />
    <button
      disabled={
        myStreamStatus !== 'ok' ||
        !Boolean(myAvatar) ||
        ['ok', 'pending'].includes(threadStatus)
      }
      onClick={onInitialConnect}
    >
      initialConnect
    </button>
  </div>
)

const Container = (props: ContainerProps) => {
  const router = useRouter()
  const threadID = router.query.threadID as string

  const setMyAvatar = useSetMyAvatar()
  const myAvatar = useMyAvatar()
  const { stream: myStream, status: myStreamStatus } = useGlobalUserMedia()
  const { initialConnect, status: threadStatus } = useGlobalThread()

  const onInitialConnect = () => {
    initialConnect({
      threadID,
      myStream,
      myAvatar,
    })
  }

  const presenterProps = {
    setMyAvatar,
    onInitialConnect,
    myStreamStatus,
    myAvatar,
    threadStatus,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadEntranceScreen(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
