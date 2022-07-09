import { ThreadUserRepository } from '@backend/src/repository/threadUser/threadUser.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadUserUsecase {
  constructor(private threadUserRepository: ThreadUserRepository) {}

  /**
   * 1つのスレッドに所属するユーザーの一覧を取得
   */
  findByThreadID(threadID: string) {
    return this.threadUserRepository.findByThreadID(threadID)
  }

  /**
   * 複数のスレッドに所属するユーザーの一覧を取得
   */
  findByThreadIDs(threadIDs: string[]) {
    const promises = threadIDs.map((threadID) =>
      this.threadUserRepository.findByThreadID(threadID),
    )
    return Promise.all(promises)
  }
}
