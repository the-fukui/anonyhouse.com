import { Backend } from '@web/infrastructure/backend'

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
}
