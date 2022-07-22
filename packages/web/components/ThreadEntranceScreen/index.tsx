import EmojiPicker from '@web/components/EmojiPicker'
import { useLoadingScreen } from '@web/hooks/useLoadingScreen'
import { useThread } from '@web/hooks/useThread'
import { useUserMedia } from '@web/hooks/useUserMedia'

import { Button, Grid, Paper, Text, createStyles } from '@mantine/core'
import { useModals } from '@mantine/modals'

import React, { useEffect, useRef, useState } from 'react'

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
  classes,
}) => (
  <Grid className={`${className}`} p={16} m={0}>
    <Grid.Col span={4} offset={4}>
      <Text size="md" weight="bold">
        あなたの絵文字
      </Text>
      <Button
        compact
        p={8}
        onClick={openEmojiPickerModal}
        className={classes.avatar}
      >
        {myAvatar}
      </Button>
    </Grid.Col>
    <Grid.Col span={12}>
      <button onClick={onEnter} disabled={isEnterButtonDisabled}>
        initialConnect
      </button>
    </Grid.Col>
  </Grid>
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
    !myAvatar ||
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

  const { classes } = useStyles()

  const presenterProps = {
    setMyAvatar,
    myAvatar,
    isEnterButtonDisabled,
    onEnter,
    openEmojiPickerModal,
    classes,
  }
  return { ...props, ...presenterProps }
}

const useStyles = createStyles((theme) => ({
  avatar: {
    aspectRatio: '1/1',
    backgroundColor: theme.colors.background?.[0],
    width: '100%',
    height: 'auto',
    fontSize: 'calc(100vw/8)',
  },
}))

export default function ThreadEntranceScreen(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
