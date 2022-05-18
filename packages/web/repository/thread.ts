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
   * SDPをDBにセット（offer/answer両対応）
   */
  public setSDP({
    userID,
    targetID,
    type,
    sdp,
  }: {
    userID: string
    targetID: string
    type: RTCSdpType
    sdp: string
  }) {
    return Firebase.instance.database.set({
      path: `/signaling/${targetID}/${type}edBy/${userID}`,
      data: { sdp },
      addTimestamp: true,
    })
  }
}
