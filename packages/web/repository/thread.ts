import { Firebase } from '@web/infrastructure/firebase'

export class ThreadRepository {
  private _threadID: string
  private _memberIDs: string[] = []

  constructor(threadID: string) {
    this._threadID = threadID
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
