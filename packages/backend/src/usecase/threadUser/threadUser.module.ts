import { ThreadUserRepositoryModule } from '@backend/src/repository/threadUser/threadUser.module'

import { Module } from '@nestjs/common'

import { ThreadUserUsecase } from './threadUser.service'

@Module({
  imports: [ThreadUserRepositoryModule],
  providers: [ThreadUserUsecase],
  exports: [ThreadUserUsecase],
})
export class ThreadUserUsecaseModule {}
