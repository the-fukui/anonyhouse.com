import {
  CreateThreadData,
  ThreadRepository,
} from '@backend/src/repository/thread/thread.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadUsecase {
  constructor(private threadRepository: ThreadRepository) {}

  create({ data, ID }: { data: CreateThreadData; ID: string }) {
    return this.threadRepository.create({ data, ID })
  }

  get(threadID: string) {
    return this.threadRepository.get(threadID)
  }

  findAll() {
    return this.threadRepository.findAll()
  }
}
