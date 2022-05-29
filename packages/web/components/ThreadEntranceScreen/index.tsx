import EmojiPicker from '@web/components/EmojiPicker'
import { useGlobalThread } from '@web/hooks/useGlobalThread'
import { useGlobalUser } from '@web/hooks/useGlobalUser'
import { useGlobalUserMedia } from '@web/hooks/useGlobalUserMedia'

import { useRouter } from 'next/router'
import React from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  setAvatar,
  myAvatar,
  myStreamStatus,
  onInitialConnect,
  threadStatus,
}) => (
  <div className={`${className}`}>
    <EmojiPicker onSelect={setAvatar} />
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

  const { setAvatar } = useGlobalUser()
  const { stream: myStream, status: myStreamStatus } = useGlobalUserMedia()
  const { avatar: myAvatar } = useGlobalUser()
  const { initialConnect, status: threadStatus } = useGlobalThread()

  const onInitialConnect = () => {
    initialConnect({
      threadID,
      myStream,
      myAvatar,
    })
  }

  const presenterProps = {
    setAvatar,
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
