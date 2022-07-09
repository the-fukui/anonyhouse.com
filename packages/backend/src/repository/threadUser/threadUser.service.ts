import { ThreadUserModel } from '@backend/src/entity/threadUser/threadUser.model'
import { Firebase } from '@backend/src/infrastructure/firebase/firebase.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadUserRepository {
  constructor(private firebase: Firebase) {}

  /**
   * 1つのスレッドに所属するユーザーの一覧を取得
   */
  findByThreadID(threadID: string) {
    return this.firebase.database.list<RTDB.Tree['users']['{userID}']>({
      path: `/users/`,
      where: {
        key: 'thread',
        value: threadID,
        op: '==',
      },
    })
  }
}
