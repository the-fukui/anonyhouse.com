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
    return this.firebase.database
      .push<RTDB.Tree['threads']['{ThreadID}']>({
        path: `/threads/`,
        data: {
          ...data,
        },
        addTimestamp: true,
      })
      .then(this.fallbackTags)
  }

  /**
   * スレッドの情報を取得
   */
  get(threadID: string) {
    return this.firebase.database
      .get<RTDB.Tree['threads']['{threadID}']>({
        path: `/threads/${threadID}`,
      })
      .then(this.fallbackTags)
  }

  /**
   * スレッドの一覧を取得
   */
  findAll() {
    return this.firebase.database
      .list<RTDB.Tree['threads']['{threadID}']>({
        path: `/threads/`,
      })
      .then((res) => res.map(this.fallbackTags))
  }

  /**
   * RTDBには空配列は保存できない
   * undefined時は空配列として返す
   */
  private fallbackTags<T extends { tags?: T['tags'] }>(
    data: T,
  ): T & Required<Pick<T, 'tags'>> {
    return {
      tags: data.tags ? data.tags : [],
      ...data,
    }
  }
}
