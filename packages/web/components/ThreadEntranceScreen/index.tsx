import EmojiPicker from '@web/components/EmojiPicker'
import { useLoadingScreen } from '@web/hooks/useLoadingScreen'
import { useThread } from '@web/hooks/useThread'
import { useUserMedia } from '@web/hooks/useUserMedia'

import { useModals } from '@mantine/modals'
import React, { useEffect, useRef, useState } from 'react'

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
  openEmojiPickerModal,
}) => (
  <div className={`${className}`}>
    <button onClick={openEmojiPickerModal}>{myAvatar}</button>
    <button onClick={onEnter} disabled={isEnterButtonDisabled}>
      initialConnect
    </button>
  </div>
)

const Container = (props: ContainerProps) => {
  const { threadID } = props
  const { enableLoading, disableLoading } = useLoadingScreen()

  //avatar
  const [myAvatar, setMyAvatar] = useState<string>('😀')

  //userMedia
  const { stream: myStream, status: myStreamStatus } = useUserMedia()

  //thread
  const { initialConnect, status: threadStatus } = useThread()

  //入室ボタン活性判定
  const isEnterButtonDisabled =
    myStreamStatus !== 'ok' ||
    !Boolean(myAvatar) ||
    ['ok', 'pending'].includes(threadStatus)

  //入室時
  const onEnter = async () => {
    enableLoading()
    myStream &&
      myAvatar &&
      (await initialConnect({ threadID, myStream, myAvatar }))
    disableLoading()
  }

  //絵文字選択モーダル
  // todo: コンポーネント分ける
  const modals = useModals()
  const openEmojiPickerModal = () => {
    const id = modals.openModal({
      padding: 0,
      withCloseButton: false,
      size: 'auto',
      children: (
        <>
          <EmojiPicker
            onSelect={(emoji) => {
              console.log(emoji)
              setMyAvatar(emoji)
              modals.closeModal(id)
            }}
          />
        </>
      ),
    })
  }

  const presenterProps = {
    setMyAvatar,
    myAvatar,
    isEnterButtonDisabled,
    onEnter,
    openEmojiPickerModal,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadEntranceScreen(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
