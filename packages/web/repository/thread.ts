import { Backend } from '@web/infrastructure/backend'
import { WatchUsersCallback } from '@web/infrastructure/database'
import { Firebase } from '@web/infrastructure/firebase'

import { FirebaseError } from 'firebase/app'

type CreateThreadData = {
  title: string
  tags: RTDB.ThreadTagUnion[]
  capacity: number
}

export class ThreadRepository {
  private _threadID: string
  private _memberIDs: string[] = []

  constructor(threadID: string) {
    this._threadID = threadID
  }

  /**
   * Threadを新規作成
   */
  public static createThread({ data }: { data: CreateThreadData }) {
    return Backend.createThread(data)
  }

  /**
   * スレッドの情報を取得
   */
  public static getThread(ID: string) {
    return Backend.getThread(ID)
  }

  /**
   * スレッドの一覧を取得
   */
  public static getThreadList() {
    return Backend.getThreads()
  }

  /**
   * ユーザー登録してIDを取得
   */
  public registerUser(myAvatar: string) {
    return Firebase.instance.database
      .push<RTDB.Tree['users']['{userID}']>({
        path: `/users/`,
        data: {
          avatar: myAvatar,
          thread: this._threadID,
        },
        addTimestamp: true,
      })
      .then((userID) => {
        if (!userID) throw new Error('no userID generated')

        //接続解除時に自動削除
        Firebase.instance.database.removeOnDisconnect({
          path: `/users/${userID}`,
        })
        return userID
      })
  }

  /**
   * ユーザー一覧を取得
   */
  public getUsers() {
    return Firebase.instance.database.list<RTDB.Tree['users']>({
      path: `/users/`,
      where: {
        key: 'thread',
        value: this._threadID,
        op: '==',
      },
      limit: 99,
    })
  }

  /**
   * ユーザー一覧を監視
   */
  public watchUsers(callback: WatchUsersCallback<RTDB.Tree['users']>) {
    Firebase.instance.database.onValue<RTDB.Tree['users']>(callback, {
      path: `/users/`,
      where: {
        key: 'thread',
        value: this._threadID,
        op: '==',
      },
    })
  }

  /**
   * SDPをDBにセット（offer/answer両対応）
   */
  public setSDP({
    myID,
    targetID,
    type,
    sdp,
  }: {
    myID: string
    targetID: string
    type: RTCSdpType
    sdp: string
  }) {
    if (type !== 'answer' && type !== 'offer') return

    return Firebase.instance.database
      .set<RTDB.Tree['signaling']['{targetID}']['{myID}']>({
        path: `/signaling/${targetID}/${myID}`,
        data: { sdp, type },
        addTimestamp: true,
      })
      .then(() => {
        //接続解除時に自動削除
        Firebase.instance.database.removeOnDisconnect({
          path: `/signaling/${targetID}/${myID}`,
        })
      })
  }

  /**
   * SDP受取時（offer/answer）にcallback発火する
   */
  public onSDPReceived = ({
    myID,
    callback,
  }: {
    myID: string
    callback: ({
      sdp,
      type,
      senderID,
    }: {
      sdp: string
      type: RTCSdpType
      senderID: string
    }) => void
  }) => {
    Firebase.instance.database.onChildAdded<RTDB.Tree['signaling']['{myID}']>(
      ({ value }) => {
        const { ID: senderID, sdp, type } = value
        if (!sdp || !type || !senderID) return

        callback({ sdp, type, senderID })
      },
      {
        path: `/signaling/${myID}/`,
      },
    )
  }
}
