import { Firebase } from '@web/infrastructure/firebase'

import { FirebaseError } from 'firebase/app'

export class ThreadRepository {
  private _threadID: string
  private _memberIDs: string[] = []

  constructor(threadID: string) {
    this._threadID = threadID
  }

  /**
   * ユーザー登録してIDを取得
   */
  public registerUser() {
    return Firebase.instance.database
      .push<EmptyObject>({
        path: `/threads/${this._threadID}/users/`,
        data: {},
        addTimestamp: true,
      })
      .then((userID) => {
        if (!userID) throw new Error('no userID generated')

        //接続解除時に自動削除
        Firebase.instance.database.removeOnDisconnect({
          path: `/threads/${this._threadID}/users/${userID}`,
        })
        return userID
      })
  }

  /**
   * ユーザー一覧を取得
   */
  public getUsers() {
    return Firebase.instance.database.get<
      RTDB.Tree['threads']['{threadID}']['users']
    >({
      path: `/threads/${this._threadID}/users/`,
    })
  }

  /**
   * ユーザー一覧を監視
   */
  public watchUsers({
    callback,
  }: {
    callback: ({
      value,
    }: {
      value: RTDB.Tree['threads']['{threadID}']['users']
    }) => void
  }) {
    Firebase.instance.database.onValue<
      RTDB.Tree['threads']['{threadID}']['users']
    >({ callback, path: `/threads/${this._threadID}/users/` })
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
    Firebase.instance.database.onChildAdded<
      RTDB.Tree['signaling']['{myID}']['senderID']
    >({
      path: `/signaling/${myID}/`,
      callback: ({ value, key }) => {
        const senderID = key.toString()
        const { sdp, type } = value
        if (!sdp || !type || !senderID) return

        callback({ sdp, type, senderID })
      },
    })
  }
}
