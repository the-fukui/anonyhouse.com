import { Firebase } from '@web/infrastructure/api/firebase'

type CreateThreadData = {
  title: string
  tags: RTDB.ThreadTagUnion[]
  capacity: number
}

export class ThreadRepository {
  constructor() {}

  /**
   * Threadを新規作成
   */
  public createThread({ data, ID }: { data: CreateThreadData; ID: string }) {
    return Firebase.instance.database.set<
      RTDB.Tree['threadInfo']['{ThreadID}']
    >({
      path: `/threadInfo/${ID}`,
      data,
      addTimestamp: true,
    })
  }
}
