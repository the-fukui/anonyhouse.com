import { usePeer } from '@web/hooks/usePeer'
import { ThreadRepository } from '@web/repository/thread'

import { useRef, useState } from 'react'
import { SignalData } from 'simple-peer'

type UseThreadArguments = {
  threadID: string
}

export const useThread = ({ threadID }: UseThreadArguments) => {
  const myStream = useRef<MediaStream>()
  const myID = useRef<string>()
  const initialUsers = useRef<{ ID: string; timestamp: number }[]>([])
  const { createPeer, peers } = usePeer()
  const threadRepository = new ThreadRepository(threadID)

  /**
   * スレッドの既存メンバーにオファーを出して接続（参加時）
   * （userMediaは別処理で）
   * 1.DBにユーザー登録
   * 2.ユーザーID取得
   * 3.スレッドメンバー取得
   * 4.メンバー分Peerを作成（自分以外）
   * 5.メンバー分シグナリング
   */
  const initialConnect = async () => {
    // 1.DBにユーザー登録
    // 2.ユーザーID取得
    await _registerUser()

    // 3.スレッドメンバー取得
    await _getUsers()

    // 4.メンバー分Peerを作成（自分以外）
    // 5.メンバー分シグナリング
    // if (!myID.current) throw new Error("Couldn't get my ID")
    // _signaling({
    //   targetIDs: initialUsers.current.filter((userID) => userID !== myID.current),
    // })
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
    initialUsers.current = Object.entries(
      users as { [key: string]: { timestamp: number } },
    ).map(([userID, values]) => {
      return { ID: userID, ...values }
    })
    return users
  }

  const _signaling = ({ targetIDs }: { targetIDs: string[] }) => {
    // if(!myStream.current) throw new Error("Couldn't get my stream")

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
