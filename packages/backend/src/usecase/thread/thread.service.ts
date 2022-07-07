import { CreateThreadDto } from '@backend/src/dto/thread/thread.dto'
import { ThreadRepository } from '@backend/src/repository/thread/thread.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadUsecase {
  constructor(private threadRepository: ThreadRepository) {}

  create({ data }: { data: CreateThreadDto }) {
    return this.threadRepository.create({ data })
  }

  get(threadID: string) {
    return this.threadRepository.get(threadID)
  }

  findAll() {
    return this.threadRepository.findAll()
  }
}
