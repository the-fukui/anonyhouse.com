import { ThreadTagRepositoryModule } from '@backend/src/repository/threadTag/threadTag.module'

import { Module } from '@nestjs/common'

import { ThreadTagUsecase } from './threadTag.service'

@Module({
  imports: [ThreadTagRepositoryModule],
  providers: [ThreadTagUsecase],
  exports: [ThreadTagUsecase],
})
export class ThreadTagUsecaseModule {}
