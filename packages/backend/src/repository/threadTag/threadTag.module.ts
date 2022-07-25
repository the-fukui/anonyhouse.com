import { Module } from '@nestjs/common'

import { ThreadTagRepository } from './threadTag.service'

@Module({
  providers: [ThreadTagRepository],
  exports: [ThreadTagRepository],
})
export class ThreadTagRepositoryModule {}
