import { usePeer } from '@web/hooks/usePeer'
import { ThreadRepository } from '@web/repository/thread'

import { useRef, useState } from 'react'
import { SignalData } from 'simple-peer'

type UseThreadArguments = {
  threadID: string
}

export const useThread = ({ threadID }: UseThreadArguments) => {
  const myID = useRef<string>()
  const [members, setMembers] = useState<string[]>([])
  const { createPeer, peers } = usePeer()
  const threadRepository = new ThreadRepository(threadID)

  /**
   * スレッドの既存メンバーにオファーを出して接続（参加時）
   * （userMediaは別処理で）
   * 1.DBにユーザー登録
   * 2.ユーザーID取得
   * 3.スレッドメンバー取得
   * 4.メンバー分Peerを作成
   * 5.メンバー分シグナリング
   */
  const initialConnect = async (stream?: MediaStream) => {
    const myID = await _registerUser()

    return

    const onStream = (stream: MediaStream, peerID: string) => {}

    //5.メンバー分シグナリング
    const onSignal = (data: SignalData, peerID: string) => {
      if (data.type !== 'answer' && data.type !== 'offer') return
      if (!data.sdp) return

      //DBにSDPをセット
      threadRepository.setSDP({
        userID: myID,
        targetID: peerID,
        type: data.type,
        sdp: data.sdp,
      })
    }

    // 4.メンバー分Peerを作成
    members
      .filter((memberID) => memberID !== myID)
      .forEach((memberID) => {
        createPeer({
          initiator: true,
          peerID: memberID,
          stream,
          onSignal,
          onStream,
        })
      })
  }

  const _registerUser = async () => {
    const userID = await threadRepository.registerUser({ threadID })
    myID.current = userID
    return userID
  }

  return {
    initialConnect,
  }
}
