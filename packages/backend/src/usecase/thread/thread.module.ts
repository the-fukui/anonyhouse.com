import { ThreadRepositoryModule } from '@backend/src/repository/thread/thread.module'

import { Module } from '@nestjs/common'

import { ThreadUsecase } from './thread.service'

@Module({
  imports: [ThreadRepositoryModule],
  providers: [ThreadUsecase],
  exports: [ThreadUsecase],
})
export class ThreadUsecaseModule {}
