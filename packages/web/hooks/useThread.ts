import { usePeer } from '@web/hooks/usePeer'
import { ThreadRepository } from '@web/repository/thread'

import { useRef, useState } from 'react'
import { SignalData } from 'simple-peer'

export const useThread = () => {
  const myID = useRef('myTestID')
  const [members, setMembers] = useState<string[]>(['testID'])
  const { createPeer, peers } = usePeer()
  const threadRepository = new ThreadRepository('testThreadID')

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
    const onStream = (stream: MediaStream, peerID: string) => {}

    //5.メンバー分シグナリング
    const onSignal = (data: SignalData, peerID: string) => {
      if (data.type !== 'answer' && data.type !== 'offer') return
      if (!data.sdp) return

      threadRepository.setSDP({
        userID: myID.current,
        targetID: peerID,
        type: data.type,
        sdp: data.sdp,
      })
    }

    // 4.メンバー分Peerを作成
    members
      .filter((memberID) => memberID !== myID.current)
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

  return {
    initialConnect,
  }
}
