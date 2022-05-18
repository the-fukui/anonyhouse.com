import { usePeer } from '@web/hooks/usePeer'
import { ThreadRepository } from '@web/repository/thread'

import { useRef, useState } from 'react'
import { SignalData } from 'simple-peer'

type UseThreadArguments = {
  threadID: string
}

type ThreadUser = {
  ID: string
} & Awaited<ReturnType<ThreadRepository['getUsers']>>['{userID}']

export const useThread = ({ threadID }: UseThreadArguments) => {
  const myStream = useRef<MediaStream>()
  const myID = useRef<string>()
  const initialUsers = useRef<ThreadUser[]>([])
  const { createPeer, peers } = usePeer()
  const threadRepository = new ThreadRepository(threadID)

  /**
   * スレッドの既存メンバーにオファーを出して接続（参加時）
   * （userMediaは別処理で）
   * 1.DBにユーザー登録
   * 2.ユーザーID取得
   * 3.スレッドメンバー取得
   * 4.自分宛てのSDPをwatchしておく
   * 5.メンバー分Peerを作成（自分以外）
   * 6.メンバー分シグナリング
   */
  const initialConnect = async () => {
    // 1.DBにユーザー登録
    // 2.ユーザーID取得
    await _registerUser()

    // 3.スレッドメンバー取得
    await _getUsers()

    if (!myID.current) throw new Error("Couldn't get my ID")

    // 4.自分宛てのSDPをwatchしておく
    threadRepository.onSDPReceived({
      myID: myID.current,
      callback: ({ sdp, type, senderID }) => {
        console.log(sdp, type, senderID)
      },
    })

    // 5.メンバー分Peerを作成（自分以外）
    // 6.メンバー分シグナリング
    _signaling({
      targetIDs: initialUsers.current
        .filter((user) => user.ID !== myID.current)
        .map((user) => user.ID),
    })
  }

  const _registerUser = async () => {
    const userID = await threadRepository.registerUser({ threadID })
    myID.current = userID
    return userID
  }

  const _getUsers = async () => {
    const users = await threadRepository.getUsers({
      threadID,
    })
    initialUsers.current = Object.entries(users).map(([userID, values]) => {
      return { ID: userID, ...values }
    })
    return users
  }

  const _signaling = ({ targetIDs }: { targetIDs: string[] }) => {
    const onStream = (stream: MediaStream, peerID: string) => {}

    const onSignal = (data: SignalData, peerID: string) => {
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

    // メンバー分Peerを作成
    targetIDs.forEach((targetID) => {
      createPeer({
        initiator: true,
        peerID: targetID,
        stream: myStream.current,
        onSignal,
        onStream,
      })
    })
  }

  return {
    initialConnect,
  }
}
