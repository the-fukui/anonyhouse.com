import EmojiPicker from '@web/components/EmojiPicker'
import { useThread } from '@web/hooks/useThread'
import { useUserMedia } from '@web/hooks/useUserMedia'

import React, { useEffect, useRef, useState } from 'react'
import { useModal } from 'react-hooks-use-modal'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  threadID: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  setMyAvatar,
  myAvatar,
  isEnterButtonDisabled,
  onEnter,
  Modal,
  openModal,
  closeModal,
}) => (
  <div className={`${className}`}>
    <button onClick={openModal}>{myAvatar}</button>
    <Modal>
      <EmojiPicker
        onSelect={(emoji) => {
          console.log(emoji)
          setMyAvatar(emoji)
          closeModal()
        }}
      />
    </Modal>
    <button onClick={onEnter} disabled={isEnterButtonDisabled}>
      initialConnect
    </button>
  </div>
)

const Container = (props: ContainerProps) => {
  const { threadID } = props

  //avatar
  const [myAvatar, setMyAvatar] = useState<string>('😀')

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

  const [Modal, openModal, closeModal] = useModal('modal')

  const presenterProps = {
    setMyAvatar,
    myAvatar,
    isEnterButtonDisabled,
    onEnter,
    Modal,
    closeModal,
    openModal,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadEntranceScreen(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
