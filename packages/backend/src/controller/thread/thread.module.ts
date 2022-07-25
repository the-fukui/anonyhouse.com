import { ThreadsController } from '@backend/src/controller/thread/thread.controller'
import { ThreadUsecaseModule } from '@backend/src/usecase/thread/thread.module'
import { ThreadTagUsecaseModule } from '@backend/src/usecase/threadTag/threadTag.module'
import { ThreadUserUsecaseModule } from '@backend/src/usecase/threadUser/threadUser.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [
    ThreadUsecaseModule,
    ThreadUserUsecaseModule,
    ThreadTagUsecaseModule,
  ],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
