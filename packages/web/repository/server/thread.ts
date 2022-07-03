import { Firebase } from '@web/infrastructure/server/firebase'

type CreateThreadData = {
  title: string
  tags: RTDB.ThreadTagUnion[]
  capacity: number
}

export class ThreadRepository {
  private _threadID: string

  constructor(threadID: string) {
    this._threadID = threadID
  }

  /**
   * Threadを新規作成
   */
  public static createThread({
    data,
    ID,
  }: {
    data: CreateThreadData
    ID: string
  }) {
    return Firebase.instance.database.set<
      RTDB.Tree['threadInfo']['{ThreadID}']
    >({
      path: `/threadInfo/${ID}`,
      data,
      addTimestamp: true,
    })
  }

  /**
   * スレッドの情報を取得
   */
  public getThread() {
    return Firebase.instance.database.get<
      RTDB.Tree['threadInfo']['{threadID}']
    >({
      path: `/threadInfo/${this._threadID}`,
    })
  }

  /**
   * スレッドの一覧を取得
   */
  public static getThreadList() {
    return Firebase.instance.database.list<
      RTDB.Tree['threadInfo']['{threadID}']
    >({
      path: `/threadInfo/`,
    })
  }
}
