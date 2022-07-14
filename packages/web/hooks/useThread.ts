import { usePeer } from '@web/hooks/usePeer'
import { Thread, ThreadUser } from '@web/models/thread'
import { ThreadRepository } from '@web/repository/thread'
import { RecoilAtomKeys } from '@web/state/recoilKeys'

import { useCallback, useEffect, useRef, useState } from 'react'
import { atom, useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil'
import { SignalData } from 'simple-peer'

type InitialConnectArguments = {
  threadID: string
  myStream: MediaStream
  myAvatar: string
}

const state = atom<Thread>({
  key: RecoilAtomKeys.THREAD,
  default: {
    ID: undefined,
    status: 'initial',
    myInfo: undefined,
    users: [],
  },
})

export const useGetThread = (): Thread => {
  const thread = useRecoilValue(state)
  return thread
}

export const useThread = () => {
  const myID = useRef<string>()
  const { createPeer, setRemote } = usePeer()
  const [thread, setThread] = useRecoilState(state)

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
  const initialConnect = useCallback(
    async ({ threadID, myStream, myAvatar }: InitialConnectArguments) => {
      const threadRepository = new ThreadRepository(threadID)

      /**
       * @todo private関数をpure functionにして、state反映はメインロジックに移す
       */

      const _registerUser = async () => {
        const userID = await threadRepository.registerUser(myAvatar)
        if (!userID) throw new Error("Couldn't get my ID")
        return userID
      }

      const _getInitialUsers = async () => {
        const threadUsers = await threadRepository.getUsers()
        return threadUsers
      }

      const _watchUsers = async () => {
        await threadRepository.watchUsers(({ value: users }) => {
          //メンバーをリアルタイム反映
          setThread((_state) => ({ ..._state, users: users }))
        })
      }

      const _onStream = (stream: MediaStream, peerID: string) => {
        //Audioを作成してStreamを再生
        const audio = document.createElement('audio')
        audio.srcObject = stream
        audio.autoplay = true
        audio.play()

        //Audioをstateのusersに追加
        setThread((_state) => ({
          ..._state,
          users: _state.users.map((user) => {
            if (user.ID === peerID) {
              return { ...user, AudioRef: audio }
            }
            return user
          }),
        }))
      }

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

      /**
       * mainロジック
       */
      setThread((_state) => ({ ..._state, ID: threadID, status: 'pending' }))

      // 1.DBにユーザー登録
      // 2.ユーザーID取得
      myID.current = await _registerUser()
      setThread((_state) => ({
        ..._state,
        myInfo: { ID: myID.current || '', avatar: myAvatar },
      }))

      // 3.スレッドメンバー取得（監視）
      const initialUsers = await _getInitialUsers()
      //初回取得時のみinitialUserとして別途保持

      // 4.スレッドメンバーwatch
      await _watchUsers()

      // 5.自分宛てのSDPをwatchしておく
      threadRepository.onSDPReceived({
        myID: myID.current,
        callback: _signaling,
      })

      // 6.メンバー分Peerを作成（自分以外）
      // 7.メンバー分シグナリング
      _initialSignaling({
        targetIDs: initialUsers
          .filter((user) => user.ID !== myID.current)
          .map((user) => user.ID),
      })

      setThread((_state) => ({ ..._state, status: 'ok' }))
    },
    [],
  )

  return {
    initialConnect,
    ...thread,
  }
}
