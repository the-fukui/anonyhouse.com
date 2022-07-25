import { ThreadTagRepository } from '@backend/src/repository/threadTag/threadTag.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadTagUsecase {
  constructor(private threadTagRepository: ThreadTagRepository) {}
  get(slug: string) {
    return this.threadTagRepository.get(slug)
  }
}
