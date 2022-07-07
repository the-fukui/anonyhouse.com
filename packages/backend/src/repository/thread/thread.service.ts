import { CreateThreadDto } from '@backend/src/dto/thread/thread.dto'
import { Firebase } from '@backend/src/infrastructure/firebase/firebase.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadRepository {
  constructor(private firebase: Firebase) {}

  /**
   * Threadを新規作成
   */
  create({ data }: { data: CreateThreadDto }) {
    return this.firebase.database.push<RTDB.Tree['threadInfo']['{ThreadID}']>({
      path: `/threadInfo/`,
      data,
      addTimestamp: true,
    })
  }

  /**
   * スレッドの情報を取得
   */
  get(threadID: string) {
    return this.firebase.database.get<RTDB.Tree['threadInfo']['{threadID}']>({
      path: `/threadInfo/${threadID}`,
    })
  }

  /**
   * スレッドの一覧を取得
   */
  findAll() {
    return this.firebase.database.list<RTDB.Tree['threadInfo']['{threadID}']>({
      path: `/threadInfo/`,
    })
  }
}