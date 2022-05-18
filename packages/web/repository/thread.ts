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
  public registerUser({ threadID }: { threadID: string }) {
    return Firebase.instance.database
      .push({
        path: `/threads/${threadID}/users/`,
        data: {},
        addTimestamp: true,
      })
      .then((userID) => {
        if (!userID) throw new Error('no userID generated')

        //接続解除時に自動削除
        Firebase.instance.database.removeOnDisconnect({
          path: `/threads/${threadID}/users/${userID}`,
        })
        return userID
      })
  }

  /**
   * ユーザー一覧を取得
   */
  public getUsers({ threadID }: { threadID: string }) {
    return Firebase.instance.database.get({
      path: `/threads/${threadID}/users/`,
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
    return Firebase.instance.database.set({
      path: `/signaling/${targetID}/${type}edBy/${myID}`,
      data: { sdp },
      addTimestamp: true,
    })
  }
}
