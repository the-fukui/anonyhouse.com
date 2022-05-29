import { usePeer } from '@web/hooks/usePeer'
import { ThreadRepository } from '@web/repository/thread'

import { useCallback, useEffect, useRef, useState } from 'react'
import { atom, useRecoilCallback, useRecoilState } from 'recoil'
import { SignalData } from 'simple-peer'

type UseThreadArguments = {
  threadID: string
  myStream?: MediaStream
  myAvatar?: string
}

type ThreadUser = {
  ID: string
  AudioRef?: HTMLAudioElement
} & Awaited<ReturnType<ThreadRepository['getUsers']>>['{userID}']

interface ThreadState {
  myID?: string
  users: ThreadUser[]
}

const threadState = atom<ThreadState>({
  key: 'Thread',
  default: {
    myID: undefined,
    users: [],
  },
})

export const useGlobalThread = ({
  threadID,
  myStream,
  myAvatar,
}: UseThreadArguments) => {
  const [state, setState] = useRecoilState(threadState)
  /**
   * hook内でのRecoil stateはuseEffect+useRefで状態変化を監視しないといけない
   * @see https://dev.to/natelindev/use-recoil-in-react-custom-hooks-52j5
   */
  const myID = useRef(state.myID)

  useEffect(() => {
    myID.current = state.myID
  }, [state])

  const initialUsers = useRef<ThreadUser[]>([])

  const { createPeer, setRemote } = usePeer()
  const threadRepository = new ThreadRepository(threadID)

  /**
   * スレッドの既存メンバーにオファーを出して接続（参加時）
   * （userMediaは別処理で）
   * 1.DBにユーザー登録
   * 2.ユーザーID取得
   * 3.スレッドメンバー取得
   * 4.スレッドメンバーwatch
   * 5.自分宛てのSDPをwatchしておく
   * 6.メンバー分Peerを作成（自分以外）
   * 7.メンバー分シグナリング
   */
  const initialConnect = useCallback(async () => {
    if (!myAvatar) throw new Error('Avatar is not set')

    // 1.DBにユーザー登録
    // 2.ユーザーID取得
    await _registerUser(myAvatar)

    // 3.スレッドメンバー取得（監視）
    await _getUsers()
    // 4.スレッドメンバーwatch
    await _watchUsers()

    if (!myID.current) throw new Error("Couldn't get my ID")

    // 5.自分宛てのSDPをwatchしておく
    threadRepository.onSDPReceived({
      myID: myID.current,
      callback: _signaling,
    })

    // 6.メンバー分Peerを作成（自分以外）
    // 7.メンバー分シグナリング
    _initialSignaling({
      targetIDs: initialUsers.current
        .filter((user) => user.ID !== myID.current)
        .map((user) => user.ID),
    })
  }, [myStream, myAvatar])

  const _registerUser = async (myAvatar: string) => {
    const userID = await threadRepository.registerUser(myAvatar)
    setState((_state) => ({ ..._state, myID: userID }))
    return userID
  }

  const _getUsers = async () => {
    const users = await threadRepository.getUsers()

    const threadUsers = Object.entries(users).map(([userID, values]) => {
      return { ID: userID, ...values }
    })

    //初回取得時のみinitialUserとして別途保持
    initialUsers.current = threadUsers
  }

  const _watchUsers = async () => {
    await threadRepository.watchUsers({
      callback: ({ value: users }) => {
        const threadUsers = Object.entries(users).map(([userID, values]) => {
          return { ID: userID, ...values }
        })

        //メンバーをリアルタイム反映
        setState((_state) => ({ ..._state, users: threadUsers }))
      },
    })
  }

  const _onStream = (stream: MediaStream, peerID: string) => {}

  const _onSignal = (data: SignalData, peerID: string) => {
    if (!myID.current) throw new Error("Couldn't get my ID")
    if (data.type !== 'answer' && data.type !== 'offer') return
    if (!data.sdp) return

    //DBにSDPをセット
    threadRepository.setSDP({
      myID: myID.current,
      targetID: peerID,
      type: data.type,
      sdp: data.sdp,
    })
  }

  const _initialSignaling = ({ targetIDs }: { targetIDs: string[] }) => {
    // メンバー分Peerを作成
    targetIDs.forEach((targetID) => {
      createPeer({
        initiator: true,
        peerID: targetID,
        stream: myStream,
        onSignal: _onSignal,
        onStream: _onStream,
      })
    })
  }

  const _signaling = ({
    sdp,
    type,
    senderID,
  }: {
    sdp: string
    type: RTCSdpType
    senderID: string
  }) => {
    if (type === 'offer') {
      createPeer({
        initiator: false,
        peerID: senderID,
        stream: myStream,
        onSignal: _onSignal,
        onStream: _onStream,
      })
    }

    setRemote({ data: { sdp, type }, peerID: senderID })
  }

  return {
    initialConnect,
    ...state,
  }
}
